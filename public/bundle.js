(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i3 = 0, len = code.length; i3 < len; ++i3) {
        lookup[i3] = code[i3];
        revLookup[code.charCodeAt(i3)] = i3;
      }
      var i3;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i4;
        for (i4 = 0; i4 < len2; i4 += 4) {
          tmp = revLookup[b64.charCodeAt(i4)] << 18 | revLookup[b64.charCodeAt(i4 + 1)] << 12 | revLookup[b64.charCodeAt(i4 + 2)] << 6 | revLookup[b64.charCodeAt(i4 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i4)] << 2 | revLookup[b64.charCodeAt(i4 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i4)] << 10 | revLookup[b64.charCodeAt(i4 + 1)] << 4 | revLookup[b64.charCodeAt(i4 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i4 = start; i4 < end; i4 += 3) {
          tmp = (uint8[i4] << 16 & 16711680) + (uint8[i4 + 1] << 8 & 65280) + (uint8[i4 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i4 = 0, len22 = len2 - extraBytes; i4 < len22; i4 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i4, i4 + maxChunkLength > len22 ? len22 : i4 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e3, m4;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i3 = isLE ? nBytes - 1 : 0;
        var d4 = isLE ? -1 : 1;
        var s4 = buffer[offset + i3];
        i3 += d4;
        e3 = s4 & (1 << -nBits) - 1;
        s4 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e3 = e3 * 256 + buffer[offset + i3], i3 += d4, nBits -= 8) {
        }
        m4 = e3 & (1 << -nBits) - 1;
        e3 >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m4 = m4 * 256 + buffer[offset + i3], i3 += d4, nBits -= 8) {
        }
        if (e3 === 0) {
          e3 = 1 - eBias;
        } else if (e3 === eMax) {
          return m4 ? NaN : (s4 ? -1 : 1) * Infinity;
        } else {
          m4 = m4 + Math.pow(2, mLen);
          e3 = e3 - eBias;
        }
        return (s4 ? -1 : 1) * m4 * Math.pow(2, e3 - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e3, m4, c4;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i3 = isLE ? 0 : nBytes - 1;
        var d4 = isLE ? 1 : -1;
        var s4 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m4 = isNaN(value) ? 1 : 0;
          e3 = eMax;
        } else {
          e3 = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c4 = Math.pow(2, -e3)) < 1) {
            e3--;
            c4 *= 2;
          }
          if (e3 + eBias >= 1) {
            value += rt / c4;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c4 >= 2) {
            e3++;
            c4 /= 2;
          }
          if (e3 + eBias >= eMax) {
            m4 = 0;
            e3 = eMax;
          } else if (e3 + eBias >= 1) {
            m4 = (value * c4 - 1) * Math.pow(2, mLen);
            e3 = e3 + eBias;
          } else {
            m4 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e3 = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i3] = m4 & 255, i3 += d4, m4 /= 256, mLen -= 8) {
        }
        e3 = e3 << mLen | m4;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i3] = e3 & 255, i3 += d4, e3 /= 256, eLen -= 8) {
        }
        buffer[offset + i3 - d4] |= s4 * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e3) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b4 = fromObject(value);
        if (b4)
          return b4;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i3 = 0; i3 < length; i3 += 1) {
          buf[i3] = array[i3] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b4) {
        return b4 != null && b4._isBuffer === true && b4 !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a4, b4) {
        if (isInstance(a4, Uint8Array))
          a4 = Buffer3.from(a4, a4.offset, a4.byteLength);
        if (isInstance(b4, Uint8Array))
          b4 = Buffer3.from(b4, b4.offset, b4.byteLength);
        if (!Buffer3.isBuffer(a4) || !Buffer3.isBuffer(b4)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a4 === b4)
          return 0;
        let x2 = a4.length;
        let y3 = b4.length;
        for (let i3 = 0, len = Math.min(x2, y3); i3 < len; ++i3) {
          if (a4[i3] !== b4[i3]) {
            x2 = a4[i3];
            y3 = b4[i3];
            break;
          }
        }
        if (x2 < y3)
          return -1;
        if (y3 < x2)
          return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i3;
        if (length === void 0) {
          length = 0;
          for (i3 = 0; i3 < list.length; ++i3) {
            length += list[i3].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i3 = 0; i3 < list.length; ++i3) {
          let buf = list[i3];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf))
                buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b4, n2, m4) {
        const i3 = b4[n2];
        b4[n2] = b4[m4];
        b4[m4] = i3;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i3 = 0; i3 < len; i3 += 2) {
          swap(this, i3, i3 + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i3 = 0; i3 < len; i3 += 4) {
          swap(this, i3, i3 + 3);
          swap(this, i3 + 1, i3 + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i3 = 0; i3 < len; i3 += 8) {
          swap(this, i3, i3 + 7);
          swap(this, i3 + 1, i3 + 6);
          swap(this, i3 + 2, i3 + 5);
          swap(this, i3 + 3, i3 + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b4) {
        if (!Buffer3.isBuffer(b4))
          throw new TypeError("Argument must be a Buffer");
        if (this === b4)
          return true;
        return Buffer3.compare(this, b4) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x2 = thisEnd - thisStart;
        let y3 = end - start;
        const len = Math.min(x2, y3);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i3 = 0; i3 < len; ++i3) {
          if (thisCopy[i3] !== targetCopy[i3]) {
            x2 = thisCopy[i3];
            y3 = targetCopy[i3];
            break;
          }
        }
        if (x2 < y3)
          return -1;
        if (y3 < x2)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i4) {
          if (indexSize === 1) {
            return buf[i4];
          } else {
            return buf.readUInt16BE(i4 * indexSize);
          }
        }
        let i3;
        if (dir) {
          let foundIndex = -1;
          for (i3 = byteOffset; i3 < arrLength; i3++) {
            if (read(arr, i3) === read(val, foundIndex === -1 ? 0 : i3 - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i3;
              if (i3 - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i3 -= i3 - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i3 = byteOffset; i3 >= 0; i3--) {
            let found = true;
            for (let j3 = 0; j3 < valLength; j3++) {
              if (read(arr, i3 + j3) !== read(val, j3)) {
                found = false;
                break;
              }
            }
            if (found)
              return i3;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i3;
        for (i3 = 0; i3 < length; ++i3) {
          const parsed = parseInt(string.substr(i3 * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i3;
          buf[offset + i3] = parsed;
        }
        return i3;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i3 = start;
        while (i3 < end) {
          const firstByte = buf[i3];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i3 + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i3 + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i3 + 1];
                thirdByte = buf[i3 + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i3 + 1];
                thirdByte = buf[i3 + 2];
                fourthByte = buf[i3 + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i3 += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i3 = 0;
        while (i3 < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i3, i3 += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i3 = start; i3 < end; ++i3) {
          ret += String.fromCharCode(buf[i3] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i3 = start; i3 < end; ++i3) {
          ret += String.fromCharCode(buf[i3]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        let out = "";
        for (let i3 = start; i3 < end; ++i3) {
          out += hexSliceLookupTable[buf[i3]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i3 = 0; i3 < bytes.length - 1; i3 += 2) {
          res += String.fromCharCode(bytes[i3] + bytes[i3 + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i3 = 0;
        while (++i3 < byteLength2 && (mul *= 256)) {
          val += this[offset + i3] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i3 = 0;
        while (++i3 < byteLength2 && (mul *= 256)) {
          val += this[offset + i3] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i3 = byteLength2;
        let mul = 1;
        let val = this[offset + --i3];
        while (i3 > 0 && (mul *= 256)) {
          val += this[offset + --i3] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i3 = 0;
        this[offset] = value & 255;
        while (++i3 < byteLength2 && (mul *= 256)) {
          this[offset + i3] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i3 = byteLength2 - 1;
        let mul = 1;
        this[offset + i3] = value & 255;
        while (--i3 >= 0 && (mul *= 256)) {
          this[offset + i3] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i3 = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i3 < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i3 - 1] !== 0) {
            sub = 1;
          }
          this[offset + i3] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i3 = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i3] = value & 255;
        while (--i3 >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i3 + 1] !== 0) {
            sub = 1;
          }
          this[offset + i3] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        let i3;
        if (typeof val === "number") {
          for (i3 = start; i3 < end; ++i3) {
            this[i3] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i3 = 0; i3 < end - start; ++i3) {
            this[i3 + start] = bytes[i3 % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i3 = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i3 >= start + 4; i3 -= 3) {
          res = `_${val.slice(i3 - 3, i3)}${res}`;
        }
        return `${val.slice(0, i3)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n2 = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
            } else {
              range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
            }
          } else {
            range = `>= ${min}${n2} and <= ${max}${n2}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i3 = 0; i3 < length; ++i3) {
          codePoint = string.charCodeAt(i3);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i3 + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i3 = 0; i3 < str.length; ++i3) {
          byteArray.push(str.charCodeAt(i3) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c4, hi, lo;
        const byteArray = [];
        for (let i3 = 0; i3 < str.length; ++i3) {
          if ((units -= 2) < 0)
            break;
          c4 = str.charCodeAt(i3);
          hi = c4 >> 8;
          lo = c4 % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i3;
        for (i3 = 0; i3 < length; ++i3) {
          if (i3 + offset >= dst.length || i3 >= src.length)
            break;
          dst[i3 + offset] = src[i3];
        }
        return i3;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i3 = 0; i3 < 16; ++i3) {
          const i16 = i3 * 16;
          for (let j3 = 0; j3 < 16; ++j3) {
            table[i16 + j3] = alphabet[i3] + alphabet[j3];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c = {};
  var s = [];
  var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var h = Array.isArray;
  function v(n2, l4) {
    for (var u3 in l4)
      n2[u3] = l4[u3];
    return n2;
  }
  function p(n2) {
    var l4 = n2.parentNode;
    l4 && l4.removeChild(n2);
  }
  function y(l4, u3, t3) {
    var i3, o4, r3, f3 = {};
    for (r3 in u3)
      "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o4 = u3[r3] : f3[r3] = u3[r3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l4 && null != l4.defaultProps)
      for (r3 in l4.defaultProps)
        void 0 === f3[r3] && (f3[r3] = l4.defaultProps[r3]);
    return d(l4, f3, i3, o4, null);
  }
  function d(n2, t3, i3, o4, r3) {
    var f3 = { type: n2, props: t3, key: i3, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
    return null == r3 && null != l.vnode && l.vnode(f3), f3;
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l4) {
    this.props = n2, this.context = l4;
  }
  function g(n2, l4) {
    if (null == l4)
      return n2.__ ? g(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l4 < n2.__k.length; l4++)
      if (null != (u3 = n2.__k[l4]) && null != u3.__e)
        return u3.__e;
    return "function" == typeof n2.type ? g(n2) : null;
  }
  function m(n2) {
    var l4, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l4 = 0; l4 < n2.__k.length; l4++)
        if (null != (u3 = n2.__k[l4]) && null != u3.__e) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return m(n2);
    }
  }
  function w(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
  }
  function x() {
    var n2, l4, u3, t3, o4, r3, e3, c4, s4;
    for (i.sort(f); n2 = i.shift(); )
      n2.__d && (l4 = i.length, t3 = void 0, o4 = void 0, r3 = void 0, c4 = (e3 = (u3 = n2).__v).__e, (s4 = u3.__P) && (t3 = [], o4 = [], (r3 = v({}, e3)).__v = e3.__v + 1, L(s4, e3, r3, u3.__n, void 0 !== s4.ownerSVGElement, null != e3.__h ? [c4] : null, t3, null == c4 ? g(e3) : c4, e3.__h, o4), M(t3, e3, o4), e3.__e != c4 && m(e3)), i.length > l4 && i.sort(f));
    x.__r = 0;
  }
  function P(n2, l4, u3, t3, i3, o4, r3, f3, e3, a4, v4) {
    var p4, y3, _2, b4, m4, w4, x2, P2, C2, H2 = 0, I3 = t3 && t3.__k || s, T2 = I3.length, j3 = T2, z3 = l4.length;
    for (u3.__k = [], p4 = 0; p4 < z3; p4++)
      null != (b4 = u3.__k[p4] = null == (b4 = l4[p4]) || "boolean" == typeof b4 || "function" == typeof b4 ? null : "string" == typeof b4 || "number" == typeof b4 || "bigint" == typeof b4 ? d(null, b4, null, null, b4) : h(b4) ? d(k, { children: b4 }, null, null, null) : b4.__b > 0 ? d(b4.type, b4.props, b4.key, b4.ref ? b4.ref : null, b4.__v) : b4) ? (b4.__ = u3, b4.__b = u3.__b + 1, -1 === (P2 = A(b4, I3, x2 = p4 + H2, j3)) ? _2 = c : (_2 = I3[P2] || c, I3[P2] = void 0, j3--), L(n2, b4, _2, i3, o4, r3, f3, e3, a4, v4), m4 = b4.__e, (y3 = b4.ref) && _2.ref != y3 && (_2.ref && O(_2.ref, null, b4), v4.push(y3, b4.__c || m4, b4)), null != m4 && (null == w4 && (w4 = m4), (C2 = _2 === c || null === _2.__v) ? -1 == P2 && H2-- : P2 !== x2 && (P2 === x2 + 1 ? H2++ : P2 > x2 ? j3 > z3 - x2 ? H2 += P2 - x2 : H2-- : H2 = P2 < x2 && P2 == x2 - 1 ? P2 - x2 : 0), x2 = p4 + H2, "function" != typeof b4.type || P2 === x2 && _2.__k !== b4.__k ? "function" == typeof b4.type || P2 === x2 && !C2 ? void 0 !== b4.__d ? (e3 = b4.__d, b4.__d = void 0) : e3 = m4.nextSibling : e3 = S(n2, m4, e3) : e3 = $(b4, e3, n2), "function" == typeof u3.type && (u3.__d = e3))) : (_2 = I3[p4]) && null == _2.key && _2.__e && (_2.__e == e3 && (e3 = g(_2)), q(_2, _2, false), I3[p4] = null);
    for (u3.__e = w4, p4 = T2; p4--; )
      null != I3[p4] && ("function" == typeof u3.type && null != I3[p4].__e && I3[p4].__e == u3.__d && (u3.__d = I3[p4].__e.nextSibling), q(I3[p4], I3[p4]));
  }
  function $(n2, l4, u3) {
    for (var t3, i3 = n2.__k, o4 = 0; i3 && o4 < i3.length; o4++)
      (t3 = i3[o4]) && (t3.__ = n2, l4 = "function" == typeof t3.type ? $(t3, l4, u3) : S(u3, t3.__e, l4));
    return l4;
  }
  function C(n2, l4) {
    return l4 = l4 || [], null == n2 || "boolean" == typeof n2 || (h(n2) ? n2.some(function(n3) {
      C(n3, l4);
    }) : l4.push(n2)), l4;
  }
  function S(n2, l4, u3) {
    return null == u3 || u3.parentNode !== n2 ? n2.insertBefore(l4, null) : l4 == u3 && null != l4.parentNode || n2.insertBefore(l4, u3), l4.nextSibling;
  }
  function A(n2, l4, u3, t3) {
    var i3 = n2.key, o4 = n2.type, r3 = u3 - 1, f3 = u3 + 1, e3 = l4[u3];
    if (null === e3 || e3 && i3 == e3.key && o4 === e3.type)
      return u3;
    if (t3 > (null != e3 ? 1 : 0))
      for (; r3 >= 0 || f3 < l4.length; ) {
        if (r3 >= 0) {
          if ((e3 = l4[r3]) && i3 == e3.key && o4 === e3.type)
            return r3;
          r3--;
        }
        if (f3 < l4.length) {
          if ((e3 = l4[f3]) && i3 == e3.key && o4 === e3.type)
            return f3;
          f3++;
        }
      }
    return -1;
  }
  function H(n2, l4, u3, t3, i3) {
    var o4;
    for (o4 in u3)
      "children" === o4 || "key" === o4 || o4 in l4 || T(n2, o4, null, u3[o4], t3);
    for (o4 in l4)
      i3 && "function" != typeof l4[o4] || "children" === o4 || "key" === o4 || "value" === o4 || "checked" === o4 || u3[o4] === l4[o4] || T(n2, o4, l4[o4], u3[o4], t3);
  }
  function I(n2, l4, u3) {
    "-" === l4[0] ? n2.setProperty(l4, null == u3 ? "" : u3) : n2[l4] = null == u3 ? "" : "number" != typeof u3 || a.test(l4) ? u3 : u3 + "px";
  }
  function T(n2, l4, u3, t3, i3) {
    var o4;
    n:
      if ("style" === l4)
        if ("string" == typeof u3)
          n2.style.cssText = u3;
        else {
          if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3)
            for (l4 in t3)
              u3 && l4 in u3 || I(n2.style, l4, "");
          if (u3)
            for (l4 in u3)
              t3 && u3[l4] === t3[l4] || I(n2.style, l4, u3[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        o4 = l4 !== (l4 = l4.replace(/(PointerCapture)$|Capture$/, "$1")), l4 = l4.toLowerCase() in n2 ? l4.toLowerCase().slice(2) : l4.slice(2), n2.l || (n2.l = {}), n2.l[l4 + o4] = u3, u3 ? t3 || n2.addEventListener(l4, o4 ? z : j, o4) : n2.removeEventListener(l4, o4 ? z : j, o4);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (i3)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l4 && "height" !== l4 && "href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && "rowSpan" !== l4 && "colSpan" !== l4 && l4 in n2)
          try {
            n2[l4] = null == u3 ? "" : u3;
            break n;
          } catch (n3) {
          }
        "function" == typeof u3 || (null == u3 || false === u3 && "-" !== l4[4] ? n2.removeAttribute(l4) : n2.setAttribute(l4, u3));
      }
  }
  function j(n2) {
    return this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function z(n2) {
    return this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function L(n2, u3, t3, i3, o4, r3, f3, e3, c4, s4) {
    var a4, p4, y3, d4, _2, g4, m4, w4, x2, $3, C2, S2, A2, H2, I3, T2 = u3.type;
    if (void 0 !== u3.constructor)
      return null;
    null != t3.__h && (c4 = t3.__h, e3 = u3.__e = t3.__e, u3.__h = null, r3 = [e3]), (a4 = l.__b) && a4(u3);
    n:
      if ("function" == typeof T2)
        try {
          if (w4 = u3.props, x2 = (a4 = T2.contextType) && i3[a4.__c], $3 = a4 ? x2 ? x2.props.value : a4.__ : i3, t3.__c ? m4 = (p4 = u3.__c = t3.__c).__ = p4.__E : ("prototype" in T2 && T2.prototype.render ? u3.__c = p4 = new T2(w4, $3) : (u3.__c = p4 = new b(w4, $3), p4.constructor = T2, p4.render = B), x2 && x2.sub(p4), p4.props = w4, p4.state || (p4.state = {}), p4.context = $3, p4.__n = i3, y3 = p4.__d = true, p4.__h = [], p4._sb = []), null == p4.__s && (p4.__s = p4.state), null != T2.getDerivedStateFromProps && (p4.__s == p4.state && (p4.__s = v({}, p4.__s)), v(p4.__s, T2.getDerivedStateFromProps(w4, p4.__s))), d4 = p4.props, _2 = p4.state, p4.__v = u3, y3)
            null == T2.getDerivedStateFromProps && null != p4.componentWillMount && p4.componentWillMount(), null != p4.componentDidMount && p4.__h.push(p4.componentDidMount);
          else {
            if (null == T2.getDerivedStateFromProps && w4 !== d4 && null != p4.componentWillReceiveProps && p4.componentWillReceiveProps(w4, $3), !p4.__e && (null != p4.shouldComponentUpdate && false === p4.shouldComponentUpdate(w4, p4.__s, $3) || u3.__v === t3.__v)) {
              for (u3.__v !== t3.__v && (p4.props = w4, p4.state = p4.__s, p4.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), C2 = 0; C2 < p4._sb.length; C2++)
                p4.__h.push(p4._sb[C2]);
              p4._sb = [], p4.__h.length && f3.push(p4);
              break n;
            }
            null != p4.componentWillUpdate && p4.componentWillUpdate(w4, p4.__s, $3), null != p4.componentDidUpdate && p4.__h.push(function() {
              p4.componentDidUpdate(d4, _2, g4);
            });
          }
          if (p4.context = $3, p4.props = w4, p4.__P = n2, p4.__e = false, S2 = l.__r, A2 = 0, "prototype" in T2 && T2.prototype.render) {
            for (p4.state = p4.__s, p4.__d = false, S2 && S2(u3), a4 = p4.render(p4.props, p4.state, p4.context), H2 = 0; H2 < p4._sb.length; H2++)
              p4.__h.push(p4._sb[H2]);
            p4._sb = [];
          } else
            do {
              p4.__d = false, S2 && S2(u3), a4 = p4.render(p4.props, p4.state, p4.context), p4.state = p4.__s;
            } while (p4.__d && ++A2 < 25);
          p4.state = p4.__s, null != p4.getChildContext && (i3 = v(v({}, i3), p4.getChildContext())), y3 || null == p4.getSnapshotBeforeUpdate || (g4 = p4.getSnapshotBeforeUpdate(d4, _2)), P(n2, h(I3 = null != a4 && a4.type === k && null == a4.key ? a4.props.children : a4) ? I3 : [I3], u3, t3, i3, o4, r3, f3, e3, c4, s4), p4.base = u3.__e, u3.__h = null, p4.__h.length && f3.push(p4), m4 && (p4.__E = p4.__ = null);
        } catch (n3) {
          u3.__v = null, (c4 || null != r3) && (u3.__e = e3, u3.__h = !!c4, r3[r3.indexOf(e3)] = null), l.__e(n3, u3, t3);
        }
      else
        null == r3 && u3.__v === t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : u3.__e = N(t3.__e, u3, t3, i3, o4, r3, f3, c4, s4);
    (a4 = l.diffed) && a4(u3);
  }
  function M(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++)
      O(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function N(l4, u3, t3, i3, o4, r3, f3, e3, s4) {
    var a4, v4, y3, d4 = t3.props, _2 = u3.props, k4 = u3.type, b4 = 0;
    if ("svg" === k4 && (o4 = true), null != r3) {
      for (; b4 < r3.length; b4++)
        if ((a4 = r3[b4]) && "setAttribute" in a4 == !!k4 && (k4 ? a4.localName === k4 : 3 === a4.nodeType)) {
          l4 = a4, r3[b4] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === k4)
        return document.createTextNode(_2);
      l4 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", k4) : document.createElement(k4, _2.is && _2), r3 = null, e3 = false;
    }
    if (null === k4)
      d4 === _2 || e3 && l4.data === _2 || (l4.data = _2);
    else {
      if (r3 = r3 && n.call(l4.childNodes), v4 = (d4 = t3.props || c).dangerouslySetInnerHTML, y3 = _2.dangerouslySetInnerHTML, !e3) {
        if (null != r3)
          for (d4 = {}, b4 = 0; b4 < l4.attributes.length; b4++)
            d4[l4.attributes[b4].name] = l4.attributes[b4].value;
        (y3 || v4) && (y3 && (v4 && y3.__html == v4.__html || y3.__html === l4.innerHTML) || (l4.innerHTML = y3 && y3.__html || ""));
      }
      if (H(l4, _2, d4, o4, e3), y3)
        u3.__k = [];
      else if (P(l4, h(b4 = u3.props.children) ? b4 : [b4], u3, t3, i3, o4 && "foreignObject" !== k4, r3, f3, r3 ? r3[0] : t3.__k && g(t3, 0), e3, s4), null != r3)
        for (b4 = r3.length; b4--; )
          null != r3[b4] && p(r3[b4]);
      e3 || ("value" in _2 && void 0 !== (b4 = _2.value) && (b4 !== l4.value || "progress" === k4 && !b4 || "option" === k4 && b4 !== d4.value) && T(l4, "value", b4, d4.value, false), "checked" in _2 && void 0 !== (b4 = _2.checked) && b4 !== l4.checked && T(l4, "checked", b4, d4.checked, false));
    }
    return l4;
  }
  function O(n2, u3, t3) {
    try {
      "function" == typeof n2 ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function q(n2, u3, t3) {
    var i3, o4;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || O(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount)
        try {
          i3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      i3.base = i3.__P = null, n2.__c = void 0;
    }
    if (i3 = n2.__k)
      for (o4 = 0; o4 < i3.length; o4++)
        i3[o4] && q(i3[o4], u3, t3 || "function" != typeof n2.type);
    t3 || null == n2.__e || p(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
  }
  function B(n2, l4, u3) {
    return this.constructor(n2, u3);
  }
  function D(u3, t3, i3) {
    var o4, r3, f3, e3;
    l.__ && l.__(u3, t3), r3 = (o4 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, f3 = [], e3 = [], L(t3, u3 = (!o4 && i3 || t3).__k = y(k, null, [u3]), r3 || c, c, void 0 !== t3.ownerSVGElement, !o4 && i3 ? [i3] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f3, !o4 && i3 ? i3 : r3 ? r3.__e : t3.firstChild, o4, e3), M(f3, u3, e3);
  }
  function F(l4, u3, t3) {
    var i3, o4, r3, f3, e3 = v({}, l4.props);
    for (r3 in l4.type && l4.type.defaultProps && (f3 = l4.type.defaultProps), u3)
      "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o4 = u3[r3] : e3[r3] = void 0 === u3[r3] && void 0 !== f3 ? f3[r3] : u3[r3];
    return arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), d(l4.type, e3, i3 || l4.key, o4 || l4.ref, null);
  }
  function G(n2, l4) {
    var u3 = { __c: l4 = "__cC" + e++, __: n2, Consumer: function(n3, l5) {
      return n3.children(l5);
    }, Provider: function(n3) {
      var u4, t3;
      return this.getChildContext || (u4 = [], (t3 = {})[l4] = this, this.getChildContext = function() {
        return t3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u4.some(function(n5) {
          n5.__e = true, w(n5);
        });
      }, this.sub = function(n4) {
        u4.push(n4);
        var l5 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4.splice(u4.indexOf(n4), 1), l5 && l5.call(n4);
        };
      }), n3.children;
    } };
    return u3.Provider.__ = u3.Consumer.contextType = u3;
  }
  n = s.slice, l = { __e: function(n2, l4, u3, t3) {
    for (var i3, o4, r3; l4 = l4.__; )
      if ((i3 = l4.__c) && !i3.__)
        try {
          if ((o4 = i3.constructor) && null != o4.getDerivedStateFromError && (i3.setState(o4.getDerivedStateFromError(n2)), r3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), r3 = i3.__d), r3)
            return i3.__E = i3;
        } catch (l5) {
          n2 = l5;
        }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, b.prototype.setState = function(n2, l4) {
    var u3;
    u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n2 && (n2 = n2(v({}, u3), this.props)), n2 && v(u3, n2), null != n2 && this.__v && (l4 && this._sb.push(l4), w(this));
  }, b.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), w(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l4) {
    return n2.__v.__b - l4.__v.__b;
  }, x.__r = 0, e = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l.__b;
  var a2 = l.__r;
  var v2 = l.diffed;
  var l2 = l.__c;
  var m2 = l.unmount;
  function d2(t3, u3) {
    l.__h && l.__h(r2, t3, o2 || u3), o2 = 0;
    var i3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return t3 >= i3.__.length && i3.__.push({ __V: c2 }), i3.__[t3];
  }
  function h2(n2) {
    return o2 = 1, s2(B2, n2);
  }
  function s2(n2, u3, i3) {
    var o4 = d2(t2++, 2);
    if (o4.t = n2, !o4.__c && (o4.__ = [i3 ? i3(u3) : B2(void 0, u3), function(n3) {
      var t3 = o4.__N ? o4.__N[0] : o4.__[0], r3 = o4.t(t3, n3);
      t3 !== r3 && (o4.__N = [r3, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r2, !r2.u)) {
      var f3 = function(n3, t3, r3) {
        if (!o4.__c.__H)
          return true;
        var u4 = o4.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        }))
          return !c4 || c4.call(this, n3, t3, r3);
        var i4 = false;
        return u4.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), !(!i4 && o4.__c.props === n3) && (!c4 || c4.call(this, n3, t3, r3));
      };
      r2.u = true;
      var c4 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u4 = c4;
          c4 = void 0, f3(n3, t3, r3), c4 = u4;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o4.__N || o4.__;
  }
  function p2(u3, i3) {
    var o4 = d2(t2++, 3);
    !l.__s && z2(o4.__H, i3) && (o4.__ = u3, o4.i = i3, r2.__H.__h.push(o4));
  }
  function b2() {
    for (var t3; t3 = f2.shift(); )
      if (t3.__P && t3.__H)
        try {
          t3.__H.__h.forEach(k2), t3.__H.__h.forEach(w2), t3.__H.__h = [];
        } catch (r3) {
          t3.__H.__h = [], l.__e(r3, t3.__v);
        }
  }
  l.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, l.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
    })) : (i3.__h.forEach(k2), i3.__h.forEach(w2), i3.__h = [], t2 = 0)), u2 = r2;
  }, l.diffed = function(t3) {
    v2 && v2(t3);
    var o4 = t3.__c;
    o4 && o4.__H && (o4.__H.__h.length && (1 !== f2.push(o4) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o4.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.__V !== c2 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c2;
    })), u2 = r2 = null;
  }, l.__c = function(t3, r3) {
    r3.some(function(t4) {
      try {
        t4.__h.forEach(k2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || w2(n2);
        });
      } catch (u3) {
        r3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), r3 = [], l.__e(u3, t4.__v);
      }
    }), l2 && l2(t3, r3);
  }, l.unmount = function(t3) {
    m2 && m2(t3);
    var r3, u3 = t3.__c;
    u3 && u3.__H && (u3.__H.__.forEach(function(n2) {
      try {
        k2(n2);
      } catch (n3) {
        r3 = n3;
      }
    }), u3.__H = void 0, r3 && l.__e(r3, u3.__v));
  };
  var g2 = "function" == typeof requestAnimationFrame;
  function j2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), g2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 100);
    g2 && (t3 = requestAnimationFrame(r3));
  }
  function k2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function w2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function z2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function B2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // node_modules/preact-router/dist/preact-router.mjs
  var a3 = {};
  function c3(n2, t3) {
    for (var r3 in t3)
      n2[r3] = t3[r3];
    return n2;
  }
  function s3(n2, t3, r3) {
    var i3, o4 = /(?:\?([^#]*))?(#.*)?$/, e3 = n2.match(o4), u3 = {};
    if (e3 && e3[1])
      for (var f3 = e3[1].split("&"), c4 = 0; c4 < f3.length; c4++) {
        var s4 = f3[c4].split("=");
        u3[decodeURIComponent(s4[0])] = decodeURIComponent(s4.slice(1).join("="));
      }
    n2 = d3(n2.replace(o4, "")), t3 = d3(t3 || "");
    for (var h4 = Math.max(n2.length, t3.length), v4 = 0; v4 < h4; v4++)
      if (t3[v4] && ":" === t3[v4].charAt(0)) {
        var l4 = t3[v4].replace(/(^:|[+*?]+$)/g, ""), p4 = (t3[v4].match(/[+*?]+$/) || a3)[0] || "", m4 = ~p4.indexOf("+"), y3 = ~p4.indexOf("*"), U2 = n2[v4] || "";
        if (!U2 && !y3 && (p4.indexOf("?") < 0 || m4)) {
          i3 = false;
          break;
        }
        if (u3[l4] = decodeURIComponent(U2), m4 || y3) {
          u3[l4] = n2.slice(v4).map(decodeURIComponent).join("/");
          break;
        }
      } else if (t3[v4] !== n2[v4]) {
        i3 = false;
        break;
      }
    return (true === r3.default || false !== i3) && u3;
  }
  function h3(n2, t3) {
    return n2.rank < t3.rank ? 1 : n2.rank > t3.rank ? -1 : n2.index - t3.index;
  }
  function v3(n2, t3) {
    return n2.index = t3, n2.rank = function(n3) {
      return n3.props.default ? 0 : d3(n3.props.path).map(l3).join("");
    }(n2), n2.props;
  }
  function d3(n2) {
    return n2.replace(/(^\/+|\/+$)/g, "").split("/");
  }
  function l3(n2) {
    return ":" == n2.charAt(0) ? 1 + "*+?".indexOf(n2.charAt(n2.length - 1)) || 4 : 5;
  }
  var p3 = {};
  var m3 = [];
  var y2 = [];
  var U = null;
  var g3 = { url: R() };
  var k3 = G(g3);
  function R() {
    var n2;
    return "" + ((n2 = U && U.location ? U.location : U && U.getCurrentLocation ? U.getCurrentLocation() : "undefined" != typeof location ? location : p3).pathname || "") + (n2.search || "");
  }
  function $2(n2, t3) {
    return void 0 === t3 && (t3 = false), "string" != typeof n2 && n2.url && (t3 = n2.replace, n2 = n2.url), function(n3) {
      for (var t4 = m3.length; t4--; )
        if (m3[t4].canRoute(n3))
          return true;
      return false;
    }(n2) && function(n3, t4) {
      void 0 === t4 && (t4 = "push"), U && U[t4] ? U[t4](n3) : "undefined" != typeof history && history[t4 + "State"] && history[t4 + "State"](null, null, n3);
    }(n2, t3 ? "replace" : "push"), I2(n2);
  }
  function I2(n2) {
    for (var t3 = false, r3 = 0; r3 < m3.length; r3++)
      m3[r3].routeTo(n2) && (t3 = true);
    return t3;
  }
  function M2(n2) {
    if (n2 && n2.getAttribute) {
      var t3 = n2.getAttribute("href"), r3 = n2.getAttribute("target");
      if (t3 && t3.match(/^\//g) && (!r3 || r3.match(/^_?self$/i)))
        return $2(t3);
    }
  }
  function b3(n2) {
    return n2.stopImmediatePropagation && n2.stopImmediatePropagation(), n2.stopPropagation && n2.stopPropagation(), n2.preventDefault(), false;
  }
  function W(n2) {
    if (!(n2.ctrlKey || n2.metaKey || n2.altKey || n2.shiftKey || n2.button)) {
      var t3 = n2.target;
      do {
        if ("a" === t3.localName && t3.getAttribute("href")) {
          if (t3.hasAttribute("data-native") || t3.hasAttribute("native"))
            return;
          if (M2(t3))
            return b3(n2);
        }
      } while (t3 = t3.parentNode);
    }
  }
  var w3 = false;
  function D2(n2) {
    n2.history && (U = n2.history), this.state = { url: n2.url || R() };
  }
  c3(D2.prototype = new b(), { shouldComponentUpdate: function(n2) {
    return true !== n2.static || n2.url !== this.props.url || n2.onChange !== this.props.onChange;
  }, canRoute: function(n2) {
    var t3 = C(this.props.children);
    return void 0 !== this.g(t3, n2);
  }, routeTo: function(n2) {
    this.setState({ url: n2 });
    var t3 = this.canRoute(n2);
    return this.p || this.forceUpdate(), t3;
  }, componentWillMount: function() {
    this.p = true;
  }, componentDidMount: function() {
    var n2 = this;
    w3 || (w3 = true, U || addEventListener("popstate", function() {
      I2(R());
    }), addEventListener("click", W)), m3.push(this), U && (this.u = U.listen(function(t3) {
      var r3 = t3.location || t3;
      n2.routeTo("" + (r3.pathname || "") + (r3.search || ""));
    })), this.p = false;
  }, componentWillUnmount: function() {
    "function" == typeof this.u && this.u(), m3.splice(m3.indexOf(this), 1);
  }, componentWillUpdate: function() {
    this.p = true;
  }, componentDidUpdate: function() {
    this.p = false;
  }, g: function(n2, t3) {
    n2 = n2.filter(v3).sort(h3);
    for (var r3 = 0; r3 < n2.length; r3++) {
      var i3 = n2[r3], o4 = s3(t3, i3.props.path, i3.props);
      if (o4)
        return [i3, o4];
    }
  }, render: function(n2, t3) {
    var e3, u3, f3 = n2.onChange, a4 = t3.url, s4 = this.c, h4 = this.g(C(n2.children), a4);
    if (h4 && (u3 = F(h4[0], c3(c3({ url: a4, matches: e3 = h4[1] }, e3), { key: void 0, ref: void 0 }))), a4 !== (s4 && s4.url)) {
      c3(g3, s4 = this.c = { url: a4, previous: s4 && s4.url, current: u3, path: u3 ? u3.props.path : null, matches: e3 }), s4.router = this, s4.active = u3 ? [u3] : [];
      for (var v4 = y2.length; v4--; )
        y2[v4]({});
      "function" == typeof f3 && f3(s4);
    }
    return y(k3.Provider, { value: s4 }, u3);
  } });

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var _ = 0;
  function o3(o4, e3, n2, t3, f3, l4) {
    var s4, u3, a4 = {};
    for (u3 in e3)
      "ref" == u3 ? s4 = e3[u3] : a4[u3] = e3[u3];
    var i3 = { type: o4, props: a4, key: n2, ref: s4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f3, __self: l4 };
    if ("function" == typeof o4 && (s4 = o4.defaultProps))
      for (u3 in s4)
        void 0 === a4[u3] && (a4[u3] = s4[u3]);
    return l.vnode && l.vnode(i3), i3;
  }

  // app/views/header.tsx
  function Header(props) {
    return /* @__PURE__ */ o3("header", { children: /* @__PURE__ */ o3("div", { class: "logo", children: /* @__PURE__ */ o3("a", { href: "/", children: /* @__PURE__ */ o3("img", { src: "/nostril-logo.jpg" }) }) }) });
  }

  // app/views/root.tsx
  function Home(props) {
    let filters = props.filters?.map((p4) => /* @__PURE__ */ o3("code", { children: JSON.stringify(p4) }));
    return /* @__PURE__ */ o3("section", { children: [
      /* @__PURE__ */ o3(Header, {}),
      /* @__PURE__ */ o3("h2", { children: "A retro-modern social network" }),
      /* @__PURE__ */ o3("p", { class: "type-m", children: "Your 2007 newsfeed rebuilt for iOS 17 and Android 14." }),
      /* @__PURE__ */ o3("ol", { children: [
        /* @__PURE__ */ o3("li", { children: [
          /* @__PURE__ */ o3("b", { children: "Human" }),
          " Chronologically ordered, no algorithmic filtering or suggested content"
        ] }),
        /* @__PURE__ */ o3("li", { children: [
          /* @__PURE__ */ o3("b", { children: "Secure" }),
          " Share your posts securely with end to end encryption"
        ] }),
        /* @__PURE__ */ o3("li", { children: [
          /* @__PURE__ */ o3("b", { children: "Private" }),
          " Your content is only viewable by your invited friends and family"
        ] }),
        /* @__PURE__ */ o3("li", { children: [
          /* @__PURE__ */ o3("b", { children: "Ad-free" }),
          " Our service has no advertising or sponsored content"
        ] })
      ] })
    ] });
  }

  // app/views/invite.tsx
  var Buffer2 = require_buffer().Buffer;
  async function decryptData(encryptedData, keyString) {
    const dataBuffer = Buffer2.from(encryptedData, "base64");
    const keyBuffer = Buffer2.from(keyString, "utf-8");
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );
    const iv = dataBuffer.slice(0, 16);
    const encrypted = dataBuffer.slice(16);
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv
      },
      cryptoKey,
      encrypted
    );
    return new TextDecoder().decode(decrypted);
  }
  var means = "Friends,Roommates,Colleagues,School,Hooked up,Online,Virtual events,Fitness,Hobby groups,I don't know them".split(",");
  function Invite(props) {
    const [payload, setPayload] = h2({});
    const task = async () => {
      let invite = JSON.parse(document.querySelector("script#invite").innerHTML);
      let otp = window.location.hash.slice(1);
      let decrypted = await decryptData(invite.payload, otp);
      setPayload(JSON.parse(decrypted));
    };
    p2(() => {
      try {
        task();
      } catch (e3) {
      }
    }, []);
    let options = means.map((c4) => /* @__PURE__ */ o3("label", { children: [
      /* @__PURE__ */ o3("input", { type: "radio" }),
      " ",
      c4
    ] }));
    return /* @__PURE__ */ o3("section", { class: "invite", children: [
      /* @__PURE__ */ o3(Header, {}),
      /* @__PURE__ */ o3("h2", { children: "Friend Request" }),
      payload.sender ? /* @__PURE__ */ o3("div", { children: [
        /* @__PURE__ */ o3("dl", { children: [
          /* @__PURE__ */ o3("dt", { children: "Group key" }),
          /* @__PURE__ */ o3("dd", { children: payload?.group_key }),
          /* @__PURE__ */ o3("dt", { children: "Author public key" }),
          /* @__PURE__ */ o3("dd", { children: payload?.public_key })
        ] }),
        /* @__PURE__ */ o3("h3", { children: [
          "How do you know ",
          payload?.sender
        ] }),
        /* @__PURE__ */ o3("fieldset", { children: options }),
        /* @__PURE__ */ o3("button", { children: "Confirm" }),
        /* @__PURE__ */ o3("button", { children: "Ignore" })
      ] }) : /* @__PURE__ */ o3("p", { children: "Loading..." })
    ] });
  }

  // app/web/index.tsx
  var Main = () => /* @__PURE__ */ o3(k, { children: /* @__PURE__ */ o3(D2, { children: [
    /* @__PURE__ */ o3(Home, { path: "/" }),
    /* @__PURE__ */ o3(Invite, { path: "/invite/:remaining_path*" })
  ] }) });
  document.addEventListener("DOMContentLoaded", () => {
    D(/* @__PURE__ */ o3(Main, {}), document.body);
  });
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
