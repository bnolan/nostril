import { useEffect, useState } from 'preact/hooks'

export default function Filetree () {
  const [file, setFile] = useState(null)
  const [keys, setKeys] = useState([])
  const [uploadSuccessful, setUploadSuccessful] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const task = async () => {
    let f = await fetch('/f/-/keys')
    let r = await f.json()

    setKeys(r.keys)
  }

  useEffect(() => {
    task()
  }, []);

  const handleInputChange = event => {
    // Add the file to state
    setFile(event.target.files[0])
  }

  const handleSubmit = async event => {
    // Don't do a real form submit
    event.preventDefault()

    setIsSubmitting(true)

    const signedUrl = await getSignedUrl()

    try {
      await uploadFile(signedUrl)
    }
    catch (err) {
      setIsSubmitting(false)
      console.log(err)
      alert('There was an error uploading your file.')
      throw err
    }

    setIsSubmitting(false)
    alert('Upload success. Check out your Space.')
  }

  const getSignedUrl = async () => {
    const body = {
      filename: file.name,
      filetype: file.type || 'application/octet-stream',
    }

    console.log(body)

    const response = await fetch(`/f/-/presign`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })
    const {signedUrl} = await response.json()

    return signedUrl
  }

  const uploadFile = async signedUrl => {
    const res = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        'x-amz-acl': 'public-read',
      }
    })

    return res
  }

  console.log(keys)
  
  return (
    <>
    <ul>
      { keys }
    </ul>

      <p>Select a dang file to upload to your Space.</p>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleInputChange} />
        <br />
        <input type="submit" value="Upload" disabled={isSubmitting} />
      </form>
    </>
  )
}