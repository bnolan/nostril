import Foundation
import CommonCrypto

func aesEncrypt(string: String, keyString: String) -> String? {
    guard let dataToEncrypt = string.data(using: .utf8),
          let keyData = keyString.data(using: .utf8) else { return nil }

    let keyLength = size_t(kCCKeySizeAES128)
    let ivSize = kCCBlockSizeAES128
    let dataLength = size_t(dataToEncrypt.count)
    let bufferSize = dataLength + kCCBlockSizeAES128

    // Generating a random IV
    var iv = Data(count: ivSize)
    let result = iv.withUnsafeMutableBytes { ivBytes in
        SecRandomCopyBytes(kSecRandomDefault, ivSize, ivBytes)
    }
    guard result == errSecSuccess else { return nil }

    var buffer = Data(count: bufferSize)
    var numBytesEncrypted = 0

    let cryptStatus = keyData.withUnsafeBytes { keyUnsafeRawBufferPointer in
        dataToEncrypt.withUnsafeBytes { dataUnsafeRawBufferPointer in
            buffer.withUnsafeMutableBytes { bufferUnsafeMutableRawBufferPointer in
                CCCrypt(CCOperation(kCCEncrypt),
                        CCAlgorithm(kCCAlgorithmAES),
                        CCOptions(kCCOptionPKCS7Padding),
                        keyUnsafeRawBufferPointer.baseAddress, keyLength,
                        iv.withUnsafeBytes { $0.baseAddress },
                        dataUnsafeRawBufferPointer.baseAddress, dataLength,
                        bufferUnsafeMutableRawBufferPointer.baseAddress, bufferSize,
                        &numBytesEncrypted)
            }
        }
    }

    guard cryptStatus == kCCSuccess else { return nil }
    
    // Prepending IV to the encrypted data
    let encryptedData = iv + buffer.prefix(numBytesEncrypted)

    // Encoding the result in Base64
    return encryptedData.base64EncodedString()
}

// Define a struct that conforms to the Encodable protocol
struct Invite: Encodable {
    var sender: String
    var public_key: String
    var group_key: String
    // Add other properties as needed
}

let pub = "123456"
let sig = "--not-implemented--"

// Create an instance of your object
let myObject = Invite(sender: "Ben N.", public_key: pub, group_key: "abcdef")

// Create a JSONEncoder instance
let encoder = JSONEncoder()

do {
    var session = URLSession.shared

    // Encode the object
    let jsonData = try encoder.encode(myObject)

    // Convert the data to a JSON string
    if let payload = String(data: jsonData, encoding: .utf8) {
        let key = "0123456789abcdef" // Replace with your key

        print("JSON Payload: \(payload)")
        print("Key: \(key)")

        if let encryptedBase64 = aesEncrypt(string: payload, keyString: key) {
          print("Encrypted Base64 String: \(encryptedBase64)")

          // let url = URL(string: "https://www.nostril.com/api/presign")
          let url = URL(string: "http://localhost:3000/api/invite")

          let json: [String: Any] = ["payload" : encryptedBase64, "pub": pub, "sig": sig]
          let jsonData = try? JSONSerialization.data(withJSONObject: json)

          var request = URLRequest(url: url!)
          request.httpMethod = "POST"
          request.addValue("application/json", forHTTPHeaderField: "Content-Type")
          request.addValue("application/json", forHTTPHeaderField: "Accept")

          // insert json data to the request
          request.httpBody = jsonData

          print("making request...")

          let (data, _) = try await session.data(for: request)
          print("request happened...")
          print(data)

          if let jsonResult = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
            if let code = jsonResult["code"] as? String {
              print("Invite url: /invite/\(code)#\(key)")
            }
          }
        } else {
            print("Encryption failed")
        }
      }
} catch {
    print("Error encoding object: \(error)")
}

