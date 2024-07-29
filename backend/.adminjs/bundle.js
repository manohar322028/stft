(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  const {
    toString
  } = Object.prototype;
  const {
    getPrototypeOf
  } = Object;
  const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));
  const kindOfTest = type => {
    type = type.toLowerCase();
    return thing => kindOf(thing) === type;
  };
  const typeOfTest = type => thing => typeof thing === type;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const {
    isArray
  } = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  const isArrayBuffer = kindOfTest('ArrayBuffer');

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  const isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  const isFunction = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  const isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject = thing => thing !== null && typeof thing === 'object';

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  const isBoolean = thing => thing === true || thing === false;

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  const isPlainObject = val => {
    if (kindOf(val) !== 'object') {
      return false;
    }
    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  const isDate$1 = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  const isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  const isStream = val => isObject(val) && isFunction(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  const isFormData = thing => {
    let kind;
    return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === 'formdata' ||
    // detect form-data instance
    kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]'));
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  const isURLSearchParams = kindOfTest('URLSearchParams');
  const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  const trim = str => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Boolean} [allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn, {
    allOwnKeys = false
  } = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }
    let i;
    let l;

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }
    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey$1(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : global;
  })();
  const isContextDefined = context => !isUndefined(context) && context !== _global;

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge( /* obj1, obj2, obj3, ... */
  ) {
    const {
      caseless
    } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey$1(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Boolean} [allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  const extend = (a, b, thisArg, {
    allOwnKeys
  } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {
      allOwnKeys
    });
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = content => {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };

  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  const toArray = thing => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  const isTypedArray = (TypedArray => {
    // eslint-disable-next-line func-names
    return thing => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  const isHTMLForm = kindOfTest('HTMLFormElement');
  const toCamelCase = str => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    });
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (({
    hasOwnProperty
  }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  const isRegExp = kindOfTest('RegExp');
  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  const freezeMethods = obj => {
    reduceDescriptors(obj, (descriptor, name) => {
      // skip restricted props in strict mode
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error('Can not rewrite read-only method \'' + name + '\'');
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = arr => {
      arr.forEach(value => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {};
  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };
  const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
  const DIGIT = '0123456789';
  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = '';
    const {
      length
    } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
  }
  const toJSONObject = obj => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = undefined;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest('AsyncFunction');
  const isThenable = thing => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  var utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate: isDate$1,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey: findKey$1,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils$1.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  const prototype$1 = AxiosError.prototype;
  const descriptors = {};
  ['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(code => {
    descriptors[code] = {
      value: code
    };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {
    value: true
  });

  // eslint-disable-next-line func-names
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, prop => {
      return prop !== 'isAxiosError';
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$1.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }
    function convertValue(value) {
      if (value === null) return '';
      if (utils$1.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError('Blob is not supported. Use a Buffer instead.');
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils$1.isUndefined(value)) return;
      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }
      stack.push(value);
      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object');
    }
    build(obj);
    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString(encoder) {
    const _encode = encoder ? function (value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
  };

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?object} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
  }

  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  };

  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  const hasStandardBrowserEnv = (product => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0;
  })(typeof navigator !== 'undefined' && navigator.product);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  const hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
  })();
  const origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    origin: origin
  });

  var platform = {
    ...utils,
    ...platform$1
  };

  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function (value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      if (name === '__proto__') return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};
      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData = utils$1.isFormData(data);
      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }
      let isFileList;
      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? {
            'files[]': data
          } : data, _FormData && new _FormData(), this.formSerializer);
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': undefined
      }
    }
  };
  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], method => {
    defaults.headers[method] = {};
  });

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$1.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = (rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
    return parsed;
  });

  const $internals = Symbol('internals');
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$1.isString(value)) return;
    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(' ' + header);
    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function (arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error('header name must be a non-empty string');
        }
        const key = utils$1.findKey(self, lHeader);
        if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
          self[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$1.findKey(self, _header);
          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];
            deleted = true;
          }
        }
      }
      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self = this;
      const headers = {};
      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);
        if (key) {
          self[key] = normalizeValue(value);
          delete self[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self[header];
        }
        self[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = Object.create(null);
      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach(target => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }
      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  }
  AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$1.reduceDescriptors(AxiosHeaders.prototype, ({
    value
  }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils$1.freezeMethods(AxiosHeaders);

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders.from(context.headers);
    let data = context.data;
    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
  }

  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }
  utils$1.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
  }

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    const threshold = 1000 / freq;
    let timer = null;
    return function throttled() {
      const force = this === true;
      const now = Date.now();
      if (force || now - timestamp > threshold) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timestamp = now;
        return fn.apply(null, arguments);
      }
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          timestamp = Date.now();
          return fn.apply(null, arguments);
        }, threshold - (now - timestamp));
      }
    };
  }

  var progressEventReducer = ((listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return throttle(e => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : undefined;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null
      };
      data[isDownloadStream ? 'download' : 'upload'] = true;
      listener(data);
    }, freq);
  });

  var isURLSameOrigin = platform.hasStandardBrowserEnv ?
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;
      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() :
  // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();

  var cookies = platform.hasStandardBrowserEnv ?
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push('path=' + path);
      utils$1.isString(domain) && cookie.push('domain=' + domain);
      secure === true && cookie.push('secure');
      document.cookie = cookie.join('; ');
    },
    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  } :
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  const headersToObject = thing => thing instanceof AxiosHeaders ? {
    ...thing
  } : thing;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({
          caseless
        }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a, caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(undefined, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge(config1[prop], config2[prop], prop);
      utils$1.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }

  var resolveConfig = (config => {
    const newConfig = mergeConfig({}, config);
    let {
      data,
      withXSRFToken,
      xsrfHeaderName,
      xsrfCookieName,
      headers,
      auth
    } = newConfig;
    newConfig.headers = headers = AxiosHeaders.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' + btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : '')));
    }
    let contentType;
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // Let the browser set it
      } else if ((contentType = headers.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
        // Add xsrf header
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  });

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
      let {
        responseType
      } = _config;
      let onCanceled;
      function done() {
        if (_config.cancelToken) {
          _config.cancelToken.unsubscribe(onCanceled);
        }
        if (_config.signal) {
          _config.signal.removeEventListener('abort', onCanceled);
        }
      }
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        const responseHeaders = AxiosHeaders.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
        const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }
      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, _config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, _config, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, _config, request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (typeof _config.onDownloadProgress === 'function') {
        request.addEventListener('progress', progressEventReducer(_config.onDownloadProgress, true));
      }

      // Not all browsers support upload events
      if (typeof _config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', progressEventReducer(_config.onUploadProgress));
      }
      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = cancel => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
        return;
      }

      // Send the request
      request.send(requestData || null);
    });
  };

  const composeSignals = (signals, timeout) => {
    let controller = new AbortController();
    let aborted;
    const onabort = function (cancel) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = cancel instanceof Error ? cancel : this.reason;
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach(signal => {
          signal && (signal.removeEventListener ? signal.removeEventListener('abort', onabort) : signal.unsubscribe(onabort));
        });
        signals = null;
      }
    };
    signals.forEach(signal => signal && signal.addEventListener && signal.addEventListener('abort', onabort));
    const {
      signal
    } = controller;
    signal.unsubscribe = unsubscribe;
    return [signal, () => {
      timer && clearTimeout(timer);
      timer = null;
    }];
  };

  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (!chunkSize || len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };
  const readBytes = async function* (iterable, chunkSize, encode) {
    for await (const chunk of iterable) {
      yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : await encode(String(chunk)), chunkSize);
    }
  };
  const trackStream = (stream, chunkSize, onProgress, onFinish, encode) => {
    const iterator = readBytes(stream, chunkSize, encode);
    let bytes = 0;
    return new ReadableStream({
      type: 'bytes',
      async pull(controller) {
        const {
          done,
          value
        } = await iterator.next();
        if (done) {
          controller.close();
          onFinish();
          return;
        }
        let len = value.byteLength;
        onProgress && onProgress(bytes += len);
        controller.enqueue(new Uint8Array(value));
      },
      cancel(reason) {
        onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    });
  };

  const fetchProgressDecorator = (total, fn) => {
    const lengthComputable = total != null;
    return loaded => setTimeout(() => fn({
      lengthComputable,
      total,
      loaded
    }));
  };
  const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? (encoder => str => encoder.encode(str))(new TextEncoder()) : async str => new Uint8Array(await new Response(str).arrayBuffer()));
  const supportsRequestStream = isReadableStreamSupported && (() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      }
    }).headers.has('Content-Type');
    return duplexAccessed && !hasContentType;
  })();
  const DEFAULT_CHUNK_SIZE = 64 * 1024;
  const supportsResponseStream = isReadableStreamSupported && !!(() => {
    try {
      return utils$1.isReadableStream(new Response('').body);
    } catch (err) {
      // return undefined
    }
  })();
  const resolvers = {
    stream: supportsResponseStream && (res => res.body)
  };
  isFetchSupported && (res => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? res => res[type]() : (_, config) => {
        throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  const getBodyLength = async body => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      return (await new Request(body).arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + '';
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  var fetchAdapter = isFetchSupported && (async config => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions
    } = resolveConfig(config);
    responseType = responseType ? (responseType + '').toLowerCase() : 'text';
    let [composedSignal, stopTimeout] = signal || cancelToken || timeout ? composeSignals([signal, cancelToken], timeout) : [];
    let finished, request;
    const onFinish = () => {
      !finished && setTimeout(() => {
        composedSignal && composedSignal.unsubscribe();
      });
      finished = true;
    };
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(requestContentLength, progressEventReducer(onUploadProgress)), null, encodeText);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? 'cors' : 'omit';
      }
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        withCredentials
      });
      let response = await fetch(request);
      const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
        const options = {};
        ['status', 'statusText', 'headers'].forEach(prop => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));
        response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(responseContentLength, progressEventReducer(onDownloadProgress, true)), isStreamResponse && onFinish, encodeText), options);
      }
      responseType = responseType || 'text';
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);
      !isStreamResponse && onFinish();
      stopTimeout && stopTimeout();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      onFinish();
      if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
        throw Object.assign(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request), {
          cause: err.cause || err
        });
      }
      throw AxiosError.from(err, err && err.code, config, request);
    }
  });

  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {
          value
        });
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {
        value
      });
    }
  });
  const renderReason = reason => `- ${reason}`;
  const isResolvedHandle = adapter => utils$1.isFunction(adapter) || adapter === null || adapter === false;
  var adapters = {
    getAdapter: adapters => {
      adapters = utils$1.isArray(adapters) ? adapters : [adapters];
      const {
        length
      } = adapters;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === undefined) {
            throw new AxiosError(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || '#' + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
        let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
        throw new AxiosError(`There is no suitable adapter to dispatch the request ` + s, 'ERR_NOT_SUPPORT');
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders.from(config.headers);

    // Transform request data
    config.data = transformData.call(config, config.transformRequest);
    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, config.transformResponse, reason.response);
          reason.response.headers = AxiosHeaders.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }

  const VERSION = "1.7.2";

  const validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });
  const deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  var validator = {
    assertOptions,
    validators: validators$1
  };

  const validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy;
          Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();

          // slice off the Error: ... line
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
          try {
            if (!err.stack) {
              err.stack = stack;
              // match without the 2 top stack lines
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
              err.stack += '\n' + stack;
            }
          } catch (e) {
            // ignore the case where "stack" is an un-writable property
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const {
        transitional,
        paramsSerializer,
        headers
      } = config;
      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }

      // Set config.method
      config.method = (config.method || this.defaults.method || 'get').toLowerCase();

      // Flatten headers
      let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
      headers && utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], method => {
        delete headers[method];
      });
      config.headers = AxiosHeaders.concat(contextHeaders, headers);

      // filter out skipped interceptors
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), undefined];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  }

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;

      // eslint-disable-next-line func-names
      this.promise.then(cancel => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = onfulfilled => {
        let _resolve;
        // eslint-disable-next-line func-names
        const promise = new Promise(resolve => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }
        token.reason = new CanceledError(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }

    /**
     * Subscribe to the cancel signal
     */

    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }

    /**
     * Unsubscribe from the cancel signal
     */

    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  }

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  }

  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig);
    const instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    utils$1.extend(instance, Axios.prototype, context, {
      allOwnKeys: true
    });

    // Copy context to instance
    utils$1.extend(instance, context, null, {
      allOwnKeys: true
    });

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;

  // Expose AxiosError class
  axios.AxiosError = AxiosError;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders;
  axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters.getAdapter;
  axios.HttpStatusCode = HttpStatusCode;
  axios.default = axios;

  const ApproveMember = props => {
    const api_url = "http://localhost:3000";
    const {
      record,
      resource
    } = props;
    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      formData.append("isApproved", "true");
      try {
        const res = await axios.put(`${api_url}/api/members/${record?.params._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        window.location.href = "http://localhost:3000/admin/resources/Member";
      } catch (error) {
        alert("An error occurred: " + error.response?.data?.message);
      }
    };
    const handleApprove = async () => {
      const formData = new FormData();
      formData.append("isApproved", "true");
      try {
        const res = await axios.post(`${api_url}/admin/api/resources/${resource.id}/records/${record?.params._id}/edit`, formData);
        window.location.href = res.data.redirectUrl;
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "white",
      width: 1 / 2,
      p: "lg",
      m: "auto",
      mt: "xxl"
    }, record?.params.isNew ? /*#__PURE__*/React__default.default.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "membership_number"
    }, "Membership Number"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "membership_number",
      name: "membership_number",
      placeholder: "Enter membership number",
      required: true
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "membership_certificate"
    }, "Membership Certificate"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "membership_certificate",
      name: "membership_certificate",
      type: "file",
      accept: "image/*, application/pdf",
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      mt: "md",
      type: "submit"
    }, "Submit")) : /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      mt: "md",
      onClick: handleApprove
    }, "Confirm Approve"));
  };

  const RejectMember = props => {
    const {
      record,
      resource
    } = props;
    const api_url = "http://localhost:3000";
    const handleSubmit = event => {
      event.preventDefault();
      axios.post(`${api_url}/admin/api/resources/${resource.id}/records/${record?.params._id}/delete`).then(res => {
        window.location.href = `${api_url}/admin/resources/${resource.id}`;
      });
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "white",
      width: 1 / 2,
      p: "lg",
      m: "auto",
      mt: "xxl"
    }, /*#__PURE__*/React__default.default.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "rejection_message"
    }, "Rejection Message"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
      id: "rejection_message",
      name: "rejection_message",
      placeholder: "Enter rejection message"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      mt: "md",
      type: "submit"
    }, "Submit")));
  };

  const Edit = ({
    property,
    record,
    onChange
  }) => {
    const {
      translateProperty
    } = adminjs.useTranslation();
    const {
      params
    } = record;
    const {
      custom
    } = property;
    const path = adminjs.flat.get(params, custom.filePathProperty);
    const key = adminjs.flat.get(params, custom.keyProperty);
    const file = adminjs.flat.get(params, custom.fileProperty);
    const [originalKey, setOriginalKey] = React.useState(key);
    const [filesToUpload, setFilesToUpload] = React.useState([]);
    React.useEffect(() => {
      // it means means that someone hit save and new file has been uploaded
      // in this case fliesToUpload should be cleared.
      // This happens when user turns off redirect after new/edit
      if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
        setOriginalKey(key);
        setFilesToUpload([]);
      }
    }, [key, originalKey]);
    const onUpload = files => {
      setFilesToUpload(files);
      onChange(custom.fileProperty, files);
    };
    const handleRemove = () => {
      onChange(custom.fileProperty, null);
    };
    const handleMultiRemove = singleKey => {
      const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
      const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
      if (path && path.length > 0) {
        const newPath = path.map((currentPath, i) => i !== index ? currentPath : null);
        let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
        newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
        onChange({
          ...record,
          params: newParams
        });
      } else {
        // eslint-disable-next-line no-console
        console.log('You cannot remove file when there are no uploaded files yet');
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)), /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
      onChange: onUpload,
      multiple: custom.multiple,
      validate: {
        mimeTypes: custom.mimeTypes,
        maxSize: custom.maxSize
      },
      files: filesToUpload
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && ( /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    })), custom.multiple && key && key.length && path ? ( /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      const currentPath = path[index];
      return currentPath ? ( /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: () => handleMultiRemove(singleKey)
      })) : '';
    }))) : '');
  };

  const AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
  const ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = props => {
    const {
      name,
      path,
      mimeType,
      width
    } = props;
    if (path && path.length) {
      if (mimeType && ImageMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default.default.createElement("img", {
          src: path,
          style: {
            maxHeight: width,
            maxWidth: width
          },
          alt: name
        });
      }
      if (mimeType && AudioMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default.default.createElement("audio", {
          controls: true,
          src: path
        }, "Your browser does not support the", /*#__PURE__*/React__default.default.createElement("code", null, "audio"), /*#__PURE__*/React__default.default.createElement("track", {
          kind: "captions"
        }));
      }
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: path,
      ml: "default",
      size: "sm",
      rounded: true,
      target: "_blank"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "DocumentDownload",
      color: "white",
      mr: "default"
    }), name));
  };
  const File = ({
    width,
    record,
    property
  }) => {
    const {
      custom
    } = property;
    let path = adminjs.flat.get(record?.params, custom.filePathProperty);
    if (!path) {
      return null;
    }
    const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
    const mimeType = custom.mimeTypeProperty && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
    if (!property.custom.multiple) {
      if (custom.opts && custom.opts.baseUrl) {
        path = `${custom.opts.baseUrl}/${name}`;
      }
      return /*#__PURE__*/React__default.default.createElement(SingleFile, {
        path: path,
        name: name,
        width: width,
        mimeType: mimeType
      });
    }
    if (custom.opts && custom.opts.baseUrl) {
      const baseUrl = custom.opts.baseUrl || '';
      path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
    }
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => ( /*#__PURE__*/React__default.default.createElement(SingleFile, {
      key: singlePath,
      path: singlePath,
      name: name[index],
      width: width,
      mimeType: mimeType[index]
    }))));
  };

  const List = props => ( /*#__PURE__*/React__default.default.createElement(File, {
    width: 100,
    ...props
  }));

  const Show = props => {
    const {
      property
    } = props;
    const {
      translateProperty
    } = adminjs.useTranslation();
    return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)), /*#__PURE__*/React__default.default.createElement(File, {
      width: "100%",
      ...props
    }));
  };

  const ImportComponent = ({
    resource
  }) => {
    const [file, setFile] = React.useState(null);
    const sendNotice = adminjs.useNotice();
    const [isFetching, setFetching] = React.useState();
    const onUpload = uploadedFile => {
      setFile(uploadedFile?.[0] ?? null);
    };
    const onSubmit = async () => {
      if (!file) {
        return;
      }
      setFetching(true);
      try {
        const importData = new FormData();
        importData.append('file', file, file?.name);
        await new adminjs.ApiClient().resourceAction({
          method: 'post',
          resourceId: resource.id,
          actionName: 'import',
          data: importData
        });
        sendNotice({
          message: 'Imported successfully',
          type: 'success'
        });
      } catch (e) {
        sendNotice({
          message: e.message,
          type: 'error'
        });
      }
      setFetching(false);
    };
    if (isFetching) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      margin: "auto",
      maxWidth: 600,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
      files: [],
      onChange: onUpload,
      multiple: false
    }), file && /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
      file: file,
      filename: file.name,
      onRemove: () => setFile(null)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "center",
      m: 10
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: onSubmit,
      disabled: !file || isFetching
    }, "Upload")));
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var FileSaver_min = {exports: {}};

  (function (module, exports) {
    (function (a, b) {
      b();
    })(commonjsGlobal, function () {

      function b(a, b) {
        return "undefined" == typeof b ? b = {
          autoBom: !1
        } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
          autoBom: !b
        }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
          type: a.type
        }) : a;
      }
      function c(a, b, c) {
        var d = new XMLHttpRequest();
        d.open("GET", a), d.responseType = "blob", d.onload = function () {
          g(d.response, b, c);
        }, d.onerror = function () {
          console.error("could not download file");
        }, d.send();
      }
      function d(a) {
        var b = new XMLHttpRequest();
        b.open("HEAD", a, !1);
        try {
          b.send();
        } catch (a) {}
        return 200 <= b.status && 299 >= b.status;
      }
      function e(a) {
        try {
          a.dispatchEvent(new MouseEvent("click"));
        } catch (c) {
          var b = document.createEvent("MouseEvents");
          b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0,
        a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
        g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
          var i = f.URL || f.webkitURL,
            j = document.createElement("a");
          g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
            i.revokeObjectURL(j.href);
          }, 4E4), setTimeout(function () {
            e(j);
          }, 0));
        } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
          if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
            var i = document.createElement("a");
            i.href = f, i.target = "_blank", setTimeout(function () {
              e(i);
            });
          }
        } : function (b, d, e, g) {
          if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
          var h = "application/octet-stream" === b.type,
            i = /constructor/i.test(f.HTMLElement) || f.safari,
            j = /CriOS\/[\d]+/.test(navigator.userAgent);
          if ((j || h && i || a) && "undefined" != typeof FileReader) {
            var k = new FileReader();
            k.onloadend = function () {
              var a = k.result;
              a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
            }, k.readAsDataURL(b);
          } else {
            var l = f.URL || f.webkitURL,
              m = l.createObjectURL(b);
            g ? g.location = m : location.href = m, g = null, setTimeout(function () {
              l.revokeObjectURL(m);
            }, 4E4);
          }
        });
      f.saveAs = g.saveAs = g, (module.exports = g);
    });
  })(FileSaver_min);
  var FileSaver_minExports = FileSaver_min.exports;

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
    }
  }

  /**
   * @name isDate
   * @category Common Helpers
   * @summary Is the given value a date?
   *
   * @description
   * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
   *
   * @param {*} value - the value to check
   * @returns {boolean} true if the given value is a date
   * @throws {TypeError} 1 arguments required
   *
   * @example
   * // For a valid date:
   * const result = isDate(new Date())
   * //=> true
   *
   * @example
   * // For an invalid date:
   * const result = isDate(new Date(NaN))
   * //=> true
   *
   * @example
   * // For some value:
   * const result = isDate('2014-02-31')
   * //=> false
   *
   * @example
   * // For an object:
   * const result = isDate({})
   * //=> false
   */
  function isDate(value) {
    requiredArgs(1, arguments);
    return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
  }

  /**
   * @name toDate
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If the argument is none of the above, the function returns Invalid Date.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   *
   * @param {Date|Number} argument - the value to convert
   * @returns {Date} the parsed date in the local time zone
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Clone the date:
   * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert the timestamp to date:
   * const result = toDate(1392098430000)
   * //=> Tue Feb 11 2014 11:30:30
   */
  function toDate(argument) {
    requiredArgs(1, arguments);
    var argStr = Object.prototype.toString.call(argument);

    // Clone the date
    if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
        // eslint-disable-next-line no-console
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }

  /**
   * @name isValid
   * @category Common Helpers
   * @summary Is the given date valid?
   *
   * @description
   * Returns false if argument is Invalid Date and true otherwise.
   * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * Invalid Date is a Date, whose time value is NaN.
   *
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * @param {*} date - the date to check
   * @returns {Boolean} the date is valid
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // For the valid date:
   * const result = isValid(new Date(2014, 1, 31))
   * //=> true
   *
   * @example
   * // For the value, convertable into a date:
   * const result = isValid(1393804800000)
   * //=> true
   *
   * @example
   * // For the invalid date:
   * const result = isValid(new Date(''))
   * //=> false
   */
  function isValid(dirtyDate) {
    requiredArgs(1, arguments);
    if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
      return false;
    }
    var date = toDate(dirtyDate);
    return !isNaN(Number(date));
  }

  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  /**
   * @name addMilliseconds
   * @category Millisecond Helpers
   * @summary Add the specified number of milliseconds to the given date.
   *
   * @description
   * Add the specified number of milliseconds to the given date.
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the milliseconds added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
   * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:30.750
   */
  function addMilliseconds(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var timestamp = toDate(dirtyDate).getTime();
    var amount = toInteger(dirtyAmount);
    return new Date(timestamp + amount);
  }

  /**
   * @name subMilliseconds
   * @category Millisecond Helpers
   * @summary Subtract the specified number of milliseconds from the given date.
   *
   * @description
   * Subtract the specified number of milliseconds from the given date.
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the milliseconds subtracted
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
   * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:29.250
   */
  function subMilliseconds(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var amount = toInteger(dirtyAmount);
    return addMilliseconds(dirtyDate, -amount);
  }

  var MILLISECONDS_IN_DAY = 86400000;
  function getUTCDayOfYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
  }

  function startOfUTCISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var weekStartsOn = 1;
    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  function getUTCISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  function startOfUTCISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var year = getUTCISOWeekYear(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCISOWeek(fourthOfJanuary);
    return date;
  }

  var MILLISECONDS_IN_WEEK$1 = 604800000;
  function getUTCISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
  }

  var defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }

  function startOfUTCWeek(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var defaultOptions = getDefaultOptions();
    var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }
    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  function getUTCWeekYear(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var year = date.getUTCFullYear();
    var defaultOptions = getDefaultOptions();
    var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  function startOfUTCWeekYear(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var defaultOptions = getDefaultOptions();
    var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
    var year = getUTCWeekYear(dirtyDate, options);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCWeek(firstWeek, options);
    return date;
  }

  var MILLISECONDS_IN_WEEK = 604800000;
  function getUTCWeek(dirtyDate, options) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
  }

  function addLeadingZeros(number, targetLength) {
    var sign = number < 0 ? '-' : '';
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return sign + output;
  }

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* |                                |
   * |  d  | Day of month                   |  D  |                                |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  m  | Minute                         |  M  | Month                          |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  y  | Year (abs)                     |  Y  |                                |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   */
  var formatters$1 = {
    // Year
    y: function y(date, token) {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

      var signedYear = date.getUTCFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
    },
    // Month
    M: function M(date, token) {
      var month = date.getUTCMonth();
      return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    // Day of the month
    d: function d(date, token) {
      return addLeadingZeros(date.getUTCDate(), token.length);
    },
    // AM or PM
    a: function a(date, token) {
      var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
      switch (token) {
        case 'a':
        case 'aa':
          return dayPeriodEnumValue.toUpperCase();
        case 'aaa':
          return dayPeriodEnumValue;
        case 'aaaaa':
          return dayPeriodEnumValue[0];
        case 'aaaa':
        default:
          return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
      }
    },
    // Hour [1-12]
    h: function h(date, token) {
      return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H: function H(date, token) {
      return addLeadingZeros(date.getUTCHours(), token.length);
    },
    // Minute
    m: function m(date, token) {
      return addLeadingZeros(date.getUTCMinutes(), token.length);
    },
    // Second
    s: function s(date, token) {
      return addLeadingZeros(date.getUTCSeconds(), token.length);
    },
    // Fraction of second
    S: function S(date, token) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };

  var dayPeriodEnum = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  };
  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
   * |  p! | Long localized time            |  P! | Long localized date            |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   * - `P` is long localized date format
   * - `p` is long localized time format
   */

  var formatters = {
    // Era
    G: function G(date, token, localize) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return localize.era(era, {
            width: 'abbreviated'
          });
        // A, B
        case 'GGGGG':
          return localize.era(era, {
            width: 'narrow'
          });
        // Anno Domini, Before Christ
        case 'GGGG':
        default:
          return localize.era(era, {
            width: 'wide'
          });
      }
    },
    // Year
    y: function y(date, token, localize) {
      // Ordinal number
      if (token === 'yo') {
        var signedYear = date.getUTCFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize.ordinalNumber(year, {
          unit: 'year'
        });
      }
      return formatters$1.y(date, token);
    },
    // Local week-numbering year
    Y: function Y(date, token, localize, options) {
      var signedWeekYear = getUTCWeekYear(date, options);
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

      // Two digit year
      if (token === 'YY') {
        var twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      }

      // Ordinal number
      if (token === 'Yo') {
        return localize.ordinalNumber(weekYear, {
          unit: 'year'
        });
      }

      // Padding
      return addLeadingZeros(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function R(date, token) {
      var isoWeekYear = getUTCISOWeekYear(date);

      // Padding
      return addLeadingZeros(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function u(date, token) {
      var year = date.getUTCFullYear();
      return addLeadingZeros(year, token.length);
    },
    // Quarter
    Q: function Q(date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
          return String(quarter);
        // 01, 02, 03, 04
        case 'QQ':
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case 'Qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4
        case 'QQQ':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'QQQQQ':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1st quarter, 2nd quarter, ...
        case 'QQQQ':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone quarter
    q: function q(date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
          return String(quarter);
        // 01, 02, 03, 04
        case 'qq':
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case 'qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4
        case 'qqq':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'qqqqq':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1st quarter, 2nd quarter, ...
        case 'qqqq':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Month
    M: function M(date, token, localize) {
      var month = date.getUTCMonth();
      switch (token) {
        case 'M':
        case 'MM':
          return formatters$1.M(date, token);
        // 1st, 2nd, ..., 12th
        case 'Mo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        // Jan, Feb, ..., Dec
        case 'MMM':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // J, F, ..., D
        case 'MMMMM':
          return localize.month(month, {
            width: 'narrow',
            context: 'formatting'
          });
        // January, February, ..., December
        case 'MMMM':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone month
    L: function L(date, token, localize) {
      var month = date.getUTCMonth();
      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return String(month + 1);
        // 01, 02, ..., 12
        case 'LL':
          return addLeadingZeros(month + 1, 2);
        // 1st, 2nd, ..., 12th
        case 'Lo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        // Jan, Feb, ..., Dec
        case 'LLL':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // J, F, ..., D
        case 'LLLLL':
          return localize.month(month, {
            width: 'narrow',
            context: 'standalone'
          });
        // January, February, ..., December
        case 'LLLL':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Local week of year
    w: function w(date, token, localize, options) {
      var week = getUTCWeek(date, options);
      if (token === 'wo') {
        return localize.ordinalNumber(week, {
          unit: 'week'
        });
      }
      return addLeadingZeros(week, token.length);
    },
    // ISO week of year
    I: function I(date, token, localize) {
      var isoWeek = getUTCISOWeek(date);
      if (token === 'Io') {
        return localize.ordinalNumber(isoWeek, {
          unit: 'week'
        });
      }
      return addLeadingZeros(isoWeek, token.length);
    },
    // Day of the month
    d: function d(date, token, localize) {
      if (token === 'do') {
        return localize.ordinalNumber(date.getUTCDate(), {
          unit: 'date'
        });
      }
      return formatters$1.d(date, token);
    },
    // Day of year
    D: function D(date, token, localize) {
      var dayOfYear = getUTCDayOfYear(date);
      if (token === 'Do') {
        return localize.ordinalNumber(dayOfYear, {
          unit: 'dayOfYear'
        });
      }
      return addLeadingZeros(dayOfYear, token.length);
    },
    // Day of week
    E: function E(date, token, localize) {
      var dayOfWeek = date.getUTCDay();
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T
        case 'EEEEE':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu
        case 'EEEEEE':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday
        case 'EEEE':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Local day of week
    e: function e(date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case 'e':
          return String(localDayOfWeek);
        // Padded numerical value
        case 'ee':
          return addLeadingZeros(localDayOfWeek, 2);
        // 1st, 2nd, ..., 7th
        case 'eo':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });
        case 'eee':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T
        case 'eeeee':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu
        case 'eeeeee':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday
        case 'eeee':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone local day of week
    c: function c(date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (same as in `e`)
        case 'c':
          return String(localDayOfWeek);
        // Padded numerical value
        case 'cc':
          return addLeadingZeros(localDayOfWeek, token.length);
        // 1st, 2nd, ..., 7th
        case 'co':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });
        case 'ccc':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // T
        case 'ccccc':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tu
        case 'cccccc':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'standalone'
          });
        // Tuesday
        case 'cccc':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // ISO day of week
    i: function i(date, token, localize) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        // 2
        case 'i':
          return String(isoDayOfWeek);
        // 02
        case 'ii':
          return addLeadingZeros(isoDayOfWeek, token.length);
        // 2nd
        case 'io':
          return localize.ordinalNumber(isoDayOfWeek, {
            unit: 'day'
          });
        // Tue
        case 'iii':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T
        case 'iiiii':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu
        case 'iiiiii':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday
        case 'iiii':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM or PM
    a: function a(date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      switch (token) {
        case 'a':
        case 'aa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'aaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          }).toLowerCase();
        case 'aaaaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'aaaa':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM, PM, midnight, noon
    b: function b(date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      }
      switch (token) {
        case 'b':
        case 'bb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'bbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          }).toLowerCase();
        case 'bbbbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'bbbb':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function B(date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'BBBBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'BBBB':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Hour [1-12]
    h: function h(date, token, localize) {
      if (token === 'ho') {
        var hours = date.getUTCHours() % 12;
        if (hours === 0) hours = 12;
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }
      return formatters$1.h(date, token);
    },
    // Hour [0-23]
    H: function H(date, token, localize) {
      if (token === 'Ho') {
        return localize.ordinalNumber(date.getUTCHours(), {
          unit: 'hour'
        });
      }
      return formatters$1.H(date, token);
    },
    // Hour [0-11]
    K: function K(date, token, localize) {
      var hours = date.getUTCHours() % 12;
      if (token === 'Ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }
      return addLeadingZeros(hours, token.length);
    },
    // Hour [1-24]
    k: function k(date, token, localize) {
      var hours = date.getUTCHours();
      if (hours === 0) hours = 24;
      if (token === 'ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }
      return addLeadingZeros(hours, token.length);
    },
    // Minute
    m: function m(date, token, localize) {
      if (token === 'mo') {
        return localize.ordinalNumber(date.getUTCMinutes(), {
          unit: 'minute'
        });
      }
      return formatters$1.m(date, token);
    },
    // Second
    s: function s(date, token, localize) {
      if (token === 'so') {
        return localize.ordinalNumber(date.getUTCSeconds(), {
          unit: 'second'
        });
      }
      return formatters$1.s(date, token);
    },
    // Fraction of second
    S: function S(date, token) {
      return formatters$1.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function X(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return 'Z';
      }
      switch (token) {
        // Hours and optional minutes
        case 'X':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);

        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`
        case 'XXXX':
        case 'XX':
          // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);

        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XXX`
        case 'XXXXX':
        case 'XXX': // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function x(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        // Hours and optional minutes
        case 'x':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);

        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`
        case 'xxxx':
        case 'xx':
          // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);

        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xxx`
        case 'xxxxx':
        case 'xxx': // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (GMT)
    O: function O(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        // Short
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long
        case 'OOOO':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (specific non-location)
    z: function z(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        // Short
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long
        case 'zzzz':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },
    // Seconds timestamp
    t: function t(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1000);
      return addLeadingZeros(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function T(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return addLeadingZeros(timestamp, token.length);
    }
  };
  function formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    var delimiter = dirtyDelimiter;
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? '-' : '+';
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, dirtyDelimiter);
  }
  function formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
    var minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }

  var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'P':
        return formatLong.date({
          width: 'short'
        });
      case 'PP':
        return formatLong.date({
          width: 'medium'
        });
      case 'PPP':
        return formatLong.date({
          width: 'long'
        });
      case 'PPPP':
      default:
        return formatLong.date({
          width: 'full'
        });
    }
  };
  var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'p':
        return formatLong.time({
          width: 'short'
        });
      case 'pp':
        return formatLong.time({
          width: 'medium'
        });
      case 'ppp':
        return formatLong.time({
          width: 'long'
        });
      case 'pppp':
      default:
        return formatLong.time({
          width: 'full'
        });
    }
  };
  var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
    var matchResult = pattern.match(/(P+)(p+)?/) || [];
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong);
    }
    var dateTimeFormat;
    switch (datePattern) {
      case 'P':
        dateTimeFormat = formatLong.dateTime({
          width: 'short'
        });
        break;
      case 'PP':
        dateTimeFormat = formatLong.dateTime({
          width: 'medium'
        });
        break;
      case 'PPP':
        dateTimeFormat = formatLong.dateTime({
          width: 'long'
        });
        break;
      case 'PPPP':
      default:
        dateTimeFormat = formatLong.dateTime({
          width: 'full'
        });
        break;
    }
    return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
  };
  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };

  /**
   * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
   * They usually appear for dates that denote time before the timezones were introduced
   * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
   * and GMT+01:00:00 after that date)
   *
   * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
   * which would lead to incorrect calculations.
   *
   * This function returns the timezone offset in milliseconds that takes seconds in account.
   */
  function getTimezoneOffsetInMilliseconds(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }

  var protectedDayOfYearTokens = ['D', 'DD'];
  var protectedWeekYearTokens = ['YY', 'YYYY'];
  function isProtectedDayOfYearToken(token) {
    return protectedDayOfYearTokens.indexOf(token) !== -1;
  }
  function isProtectedWeekYearToken(token) {
    return protectedWeekYearTokens.indexOf(token) !== -1;
  }
  function throwProtectedError(token, format, input) {
    if (token === 'YYYY') {
      throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    } else if (token === 'YY') {
      throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    } else if (token === 'D') {
      throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    } else if (token === 'DD') {
      throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    }
  }

  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },
    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },
    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },
    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },
    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },
    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },
    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks'
    },
    xWeeks: {
      one: '1 week',
      other: '{{count}} weeks'
    },
    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },
    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },
    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },
    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },
    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },
    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };
  var formatDistance = function formatDistance(token, count, options) {
    var result;
    var tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === 'string') {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace('{{count}}', count.toString());
    }
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }
    return result;
  };

  function buildFormatLongFn(args) {
    return function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // TODO: Remove String()
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }

  var dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy'
  };
  var timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a'
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: 'full'
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: 'full'
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: 'full'
    })
  };

  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P'
  };
  var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  };

  function buildLocalizeFn(args) {
    return function (dirtyIndex, options) {
      var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
      var valuesArray;
      if (context === 'formatting' && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
      return valuesArray[index];
    };
  }

  var eraValues = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini']
  };
  var quarterValues = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
  };

  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var monthValues = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  var dayValues = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  var dayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    }
  };
  var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
    var number = Number(dirtyNumber);

    // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`.
    //
    // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'.

    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + 'st';
        case 2:
          return number + 'nd';
        case 3:
          return number + 'rd';
      }
    }
    return number + 'th';
  };
  var localize = {
    ordinalNumber: ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: 'wide'
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: 'wide',
      argumentCallback: function argumentCallback(quarter) {
        return quarter - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: 'wide'
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: 'wide'
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: 'wide',
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: 'wide'
    })
  };

  function buildMatchFn(args) {
    return function (string) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      }) : findKey(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
      var value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value: value,
        rest: rest
      };
    };
  }
  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
    return undefined;
  }
  function findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return undefined;
  }

  function buildMatchPatternFn(args) {
    return function (string) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value: value,
        rest: rest
      };
    };
  }

  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function valueCallback(value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseEraPatterns,
      defaultParseWidth: 'any'
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: 'any',
      valueCallback: function valueCallback(index) {
        return index + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: 'any'
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseDayPatterns,
      defaultParseWidth: 'any'
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: 'any',
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: 'any'
    })
  };

  /**
   * @type {Locale}
   * @category Locales
   * @summary English locale (United States).
   * @language English
   * @iso-639-2 eng
   * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
   * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
   */
  var locale = {
    code: 'en-US',
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
      weekStartsOn: 0 /* Sunday */,
      firstWeekContainsDate: 1
    }
  };

  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  //   (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  //   except a single quote symbol, which ends the sequence.
  //   Two quote characters do not end the sequence.
  //   If there is no matching single quote
  //   then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps
  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

  // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'([^]*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

  /**
   * @name format
   * @category Common Helpers
   * @summary Format the date.
   *
   * @description
   * Return the formatted date string in the given format. The result may vary by locale.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * The characters wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   * (see the last example)
   *
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 7 below the table).
   *
   * Accepted patterns:
   * | Unit                            | Pattern | Result examples                   | Notes |
   * |---------------------------------|---------|-----------------------------------|-------|
   * | Era                             | G..GGG  | AD, BC                            |       |
   * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 | GGGGG   | A, B                              |       |
   * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
   * |                                 | yy      | 44, 01, 00, 17                    | 5     |
   * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
   * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
   * |                                 | yyyyy   | ...                               | 3,5   |
   * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
   * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
   * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
   * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
   * |                                 | YYYYY   | ...                               | 3,5   |
   * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
   * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
   * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
   * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
   * |                                 | RRRRR   | ...                               | 3,5,7 |
   * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
   * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
   * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
   * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
   * |                                 | uuuuu   | ...                               | 3,5   |
   * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
   * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | QQ      | 01, 02, 03, 04                    |       |
   * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
   * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | qq      | 01, 02, 03, 04                    |       |
   * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
   * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
   * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | MM      | 01, 02, ..., 12                   |       |
   * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 | MMMM    | January, February, ..., December  | 2     |
   * |                                 | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
   * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | LL      | 01, 02, ..., 12                   |       |
   * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 | LLLL    | January, February, ..., December  | 2     |
   * |                                 | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | w       | 1, 2, ..., 53                     |       |
   * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
   * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | II      | 01, 02, ..., 53                   | 7     |
   * | Day of month                    | d       | 1, 2, ..., 31                     |       |
   * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
   * |                                 | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
   * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
   * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
   * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 | DDDD    | ...                               | 3     |
   * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
   * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
   * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
   * |                                 | ii      | 01, 02, ..., 07                   | 7     |
   * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
   * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
   * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
   * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
   * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | ee      | 02, 03, ..., 01                   |       |
   * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
   * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | cc      | 02, 03, ..., 01                   |       |
   * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
   * | AM, PM                          | a..aa   | AM, PM                            |       |
   * |                                 | aaa     | am, pm                            |       |
   * |                                 | aaaa    | a.m., p.m.                        | 2     |
   * |                                 | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
   * |                                 | bbb     | am, pm, noon, midnight            |       |
   * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
   * |                                 | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
   * |                                 | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
   * |                                 | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
   * |                                 | KK      | 01, 02, ..., 11, 00               |       |
   * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
   * |                                 | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          | m       | 0, 1, ..., 59                     |       |
   * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | mm      | 00, 01, ..., 59                   |       |
   * | Second                          | s       | 0, 1, ..., 59                     |       |
   * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | ss      | 00, 01, ..., 59                   |       |
   * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
   * |                                 | SS      | 00, 01, ..., 99                   |       |
   * |                                 | SSS     | 000, 001, ..., 999                |       |
   * |                                 | SSSS    | ...                               | 3     |
   * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
   * |                                 | XX      | -0800, +0530, Z                   |       |
   * |                                 | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
   * |                                 | xx      | -0800, +0530, +0000               |       |
   * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
   * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
   * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
   * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
   * | Seconds timestamp               | t       | 512969520                         | 7     |
   * |                                 | tt      | ...                               | 3,7   |
   * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
   * |                                 | TT      | ...                               | 3,7   |
   * | Long localized date             | P       | 04/29/1453                        | 7     |
   * |                                 | PP      | Apr 29, 1453                      | 7     |
   * |                                 | PPP     | April 29th, 1453                  | 7     |
   * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
   * | Long localized time             | p       | 12:00 AM                          | 7     |
   * |                                 | pp      | 12:00:00 AM                       | 7     |
   * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
   * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
   * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
   * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
   * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
   * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
   *    the output will be the same as default pattern for this unit, usually
   *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
   *    are marked with "2" in the last column of the table.
   *
   *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
   *
   * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
   *    The output will be padded with zeros to match the length of the pattern.
   *
   *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
   *
   * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 5. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` always returns the last two digits of a year,
   *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
   *
   *    | Year | `yy` | `uu` |
   *    |------|------|------|
   *    | 1    |   01 |   01 |
   *    | 14   |   14 |   14 |
   *    | 376  |   76 |  376 |
   *    | 1453 |   53 | 1453 |
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
   *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
   *
   * 6. Specific non-location timezones are currently unavailable in `date-fns`,
   *    so right now these tokens fall back to GMT timezones.
   *
   * 7. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `t`: seconds timestamp
   *    - `T`: milliseconds timestamp
   *    - `o`: ordinal number modifier
   *    - `P`: long localized date
   *    - `p`: long localized time
   *
   * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
   *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
   *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * @param {Date|Number} date - the original date
   * @param {String} format - the string of tokens
   * @param {Object} [options] - an object with options.
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
   * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
   *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
   *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @returns {String} the formatted date string
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `date` must not be Invalid Date
   * @throws {RangeError} `options.locale` must contain `localize` property
   * @throws {RangeError} `options.locale` must contain `formatLong` property
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
   * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws {RangeError} format string contains an unescaped latin alphabet character
   *
   * @example
   * // Represent 11 February 2014 in middle-endian format:
   * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
   * //=> '02/11/2014'
   *
   * @example
   * // Represent 2 July 2014 in Esperanto:
   * import { eoLocale } from 'date-fns/locale/eo'
   * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
   *   locale: eoLocale
   * })
   * //=> '2-a de julio 2014'
   *
   * @example
   * // Escape string by single quote characters:
   * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
   * //=> "3 o'clock"
   */

  function format(dirtyDate, dirtyFormatStr, options) {
    var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _defaultOptions$local3, _defaultOptions$local4;
    requiredArgs(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var defaultOptions = getDefaultOptions();
    var locale$1 = (_ref = (_options$locale = void 0 ) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : locale;
    var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = void 0 ) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : void 0 ) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }
    var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = void 0 ) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : void 0 ) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }
    if (!locale$1.localize) {
      throw new RangeError('locale must contain localize property');
    }
    if (!locale$1.formatLong) {
      throw new RangeError('locale must contain formatLong property');
    }
    var originalDate = toDate(dirtyDate);
    if (!isValid(originalDate)) {
      throw new RangeError('Invalid time value');
    }

    // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
    var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
    var utcDate = subMilliseconds(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale$1,
      _originalDate: originalDate
    };
    var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === 'p' || firstCharacter === 'P') {
        var longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale$1.formatLong);
      }
      return substring;
    }).join('').match(formattingTokensRegExp).map(function (substring) {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'";
      }
      var firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }
      var formatter = formatters[firstCharacter];
      if (formatter) {
        if (isProtectedWeekYearToken(substring)) {
          throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
        }
        if (isProtectedDayOfYearToken(substring)) {
          throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
        }
        return formatter(utcDate, substring, locale$1.localize, formatterOptions);
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
      }
      return substring;
    }).join('');
    return result;
  }
  function cleanEscapedString(input) {
    var matched = input.match(escapedStringRegExp);
    if (!matched) {
      return input;
    }
    return matched[1].replace(doubleQuoteRegExp, "'");
  }

  const Exporters = ['csv', 'json', 'xml'];

  const mimeTypes = {
    json: 'application/json',
    csv: 'text/csv',
    xml: 'text/xml'
  };
  const getExportedFileName = extension => `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;
  const ExportComponent = ({
    resource
  }) => {
    const [isFetching, setFetching] = React.useState();
    const sendNotice = adminjs.useNotice();
    const exportData = async type => {
      setFetching(true);
      try {
        const {
          data: {
            exportedData
          }
        } = await new adminjs.ApiClient().resourceAction({
          method: 'post',
          resourceId: resource.id,
          actionName: 'export',
          params: {
            type
          }
        });
        const blob = new Blob([exportedData], {
          type: mimeTypes[type]
        });
        FileSaver_minExports.saveAs(blob, getExportedFileName(type));
        sendNotice({
          message: 'Exported successfully',
          type: 'success'
        });
      } catch (e) {
        sendNotice({
          message: e.message,
          type: 'error'
        });
      }
      setFetching(false);
    };
    if (isFetching) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "lg"
    }, "Choose export format:")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "center"
    }, Exporters.map(parserType => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: parserType,
      m: 2
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: () => exportData(parserType),
      disabled: isFetching
    }, parserType.toUpperCase())))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.ApproveMember = ApproveMember;
  AdminJS.UserComponents.RejectMember = RejectMember;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;
  AdminJS.UserComponents.ImportComponent = ImportComponent;
  AdminJS.UserComponents.ExportComponent = ExportComponent;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL251bGwuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21wb3NlU2lnbmFscy5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCIuLi9hcGkvQXBwcm92ZU1lbWJlci50c3giLCIuLi9hcGkvUmVqZWN0TWVtYmVyLnRzeCIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZmlsZS5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9JbXBvcnRDb21wb25lbnQuanN4IiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzRGF0ZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNWYWxpZC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3RvSW50ZWdlci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9hZGRNaWxsaXNlY29uZHMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vc3ViTWlsbGlzZWNvbmRzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDRGF5T2ZZZWFyL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3N0YXJ0T2ZVVENJU09XZWVrWWVhci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ0lTT1dlZWsvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDV2Vla1llYXIvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9zdGFydE9mVVRDV2Vla1llYXIvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENXZWVrL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZm9ybWF0L2xpZ2h0Rm9ybWF0dGVycy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3Byb3RlY3RlZFRva2Vucy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRMb25nL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9tYXRjaC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZm9ybWF0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvZXhwb3J0ZXIudHlwZS5qcyIsIi4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2NvbXBvbmVudHMvRXhwb3J0Q29tcG9uZW50LmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUpO1xuICB9IDogZW5jb2RlO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGNvbnN0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgdGltZXIgPSBudWxsO1xuICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIGNvbnN0IGZvcmNlID0gdGhpcyA9PT0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKGZvcmNlIHx8IG5vdyAtIHRpbWVzdGFtcCA+IHRocmVzaG9sZCkge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpZiAoIXRpbWVyKSB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSwgdGhyZXNob2xkIC0gKG5vdyAtIHRpbWVzdGFtcCkpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0cyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICBsZXQgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHByb2dyZXNzRXZlbnRSZWR1Y2VyIGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBsZXQge3Jlc3BvbnNlVHlwZX0gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIF9jb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBfY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBfY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBfY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKF9jb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIF9jb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihfY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICBsZXQgYWJvcnRlZDtcblxuICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKGNhbmNlbCkge1xuICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgY29uc3QgZXJyID0gY2FuY2VsIGluc3RhbmNlb2YgRXJyb3IgPyBjYW5jZWwgOiB0aGlzLnJlYXNvbjtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvciA/IGVyciA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgfSwgdGltZW91dClcblxuICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICBpZiAoc2lnbmFscykge1xuICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICBzaWduYWwgJiZcbiAgICAgICAgKHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyID8gc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkgOiBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkpO1xuICAgICAgfSk7XG4gICAgICBzaWduYWxzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG5cbiAgcmV0dXJuIFtzaWduYWwsICgpID0+IHtcbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgfV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgdHlwZTogJ2J5dGVzJyxcblxuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGJ5dGVzICs9IGxlbik7XG4gICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIG9uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gXCIuLi9wbGF0Zm9ybS9pbmRleC5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gXCIuLi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzXCI7XG5pbXBvcnQge3RyYWNrU3RyZWFtfSBmcm9tIFwiLi4vaGVscGVycy90cmFja1N0cmVhbS5qc1wiO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi4vY29yZS9BeGlvc0hlYWRlcnMuanNcIjtcbmltcG9ydCBwcm9ncmVzc0V2ZW50UmVkdWNlciBmcm9tIFwiLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qc1wiO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuaW1wb3J0IHNldHRsZSBmcm9tIFwiLi4vY29yZS9zZXR0bGUuanNcIjtcblxuY29uc3QgZmV0Y2hQcm9ncmVzc0RlY29yYXRvciA9ICh0b3RhbCwgZm4pID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG4gIHJldHVybiAobG9hZGVkKSA9PiBzZXRUaW1lb3V0KCgpID0+IGZuKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSk7XG59XG5cbmNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgdHlwZW9mIFJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXG4vLyB1c2VkIG9ubHkgaW5zaWRlIHRoZSBmZXRjaCBhZGFwdGVyXG5jb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAoKGVuY29kZXIpID0+IChzdHIpID0+IGVuY29kZXIuZW5jb2RlKHN0cikpKG5ldyBUZXh0RW5jb2RlcigpKSA6XG4gICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlc3BvbnNlKHN0cikuYXJyYXlCdWZmZXIoKSlcbik7XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgKCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pKCk7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgISEoKCk9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KTtcbiAgfSBjYXRjaChlcnIpIHtcbiAgICAvLyByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn0pKCk7XG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMuaXNGdW5jdGlvbihyZXNbdHlwZV0pID8gKHJlcykgPT4gcmVzW3R5cGVdKCkgOlxuICAgICAgKF8sIGNvbmZpZykgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cblxuICBpZih1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBuZXcgUmVxdWVzdChib2R5KS5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICBib2R5ID0gYm9keSArICcnO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn1cblxuY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgW2NvbXBvc2VkU2lnbmFsLCBzdG9wVGltZW91dF0gPSAoc2lnbmFsIHx8IGNhbmNlbFRva2VuIHx8IHRpbWVvdXQpID9cbiAgICBjb21wb3NlU2lnbmFscyhbc2lnbmFsLCBjYW5jZWxUb2tlbl0sIHRpbWVvdXQpIDogW107XG5cbiAgbGV0IGZpbmlzaGVkLCByZXF1ZXN0O1xuXG4gIGNvbnN0IG9uRmluaXNoID0gKCkgPT4ge1xuICAgICFmaW5pc2hlZCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG5cbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gIH1cblxuICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICBvblVwbG9hZFByb2dyZXNzICYmIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICApIHtcbiAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIlxuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpXG4gICAgICAgICksIG51bGwsIGVuY29kZVRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2NvcnMnIDogJ29taXQnO1xuICAgIH1cblxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgd2l0aENyZWRlbnRpYWxzXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcblxuICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICBpZiAoc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAob25Eb3dubG9hZFByb2dyZXNzIHx8IGlzU3RyZWFtUmVzcG9uc2UpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uRG93bmxvYWRQcm9ncmVzcyAmJiBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpXG4gICAgICAgICksIGlzU3RyZWFtUmVzcG9uc2UgJiYgb25GaW5pc2gsIGVuY29kZVRleHQpLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuXG4gICAgc3RvcFRpbWVvdXQgJiYgc3RvcFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgb25GaW5pc2goKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS43LjJcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQm94LCBGb3JtR3JvdXAsIExhYmVsLCBJbnB1dCwgQnV0dG9uIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEFjdGlvblByb3BzIH0gZnJvbSBcImFkbWluanNcIjtcblxuY29uc3QgQXBwcm92ZU1lbWJlciA9IChwcm9wczogQWN0aW9uUHJvcHMpID0+IHtcbiAgY29uc3QgYXBpX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG4gIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSB9ID0gcHJvcHM7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCBhcyBIVE1MRm9ybUVsZW1lbnQpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImlzQXBwcm92ZWRcIiwgXCJ0cnVlXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLnB1dChcbiAgICAgICAgYCR7YXBpX3VybH0vYXBpL21lbWJlcnMvJHtyZWNvcmQ/LnBhcmFtcy5faWR9YCxcbiAgICAgICAgZm9ybURhdGEsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FkbWluL3Jlc291cmNlcy9NZW1iZXJcIjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFwcHJvdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJpc0FwcHJvdmVkXCIsIFwidHJ1ZVwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5wb3N0KFxuICAgICAgICBgJHthcGlfdXJsfS9hZG1pbi9hcGkvcmVzb3VyY2VzLyR7cmVzb3VyY2UuaWR9L3JlY29yZHMvJHtyZWNvcmQ/LnBhcmFtcy5faWR9L2VkaXRgLFxuICAgICAgICBmb3JtRGF0YVxuICAgICAgKTtcblxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXMuZGF0YS5yZWRpcmVjdFVybDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHdpZHRoPXsxIC8gMn0gcD1cImxnXCIgbT1cImF1dG9cIiBtdD1cInh4bFwiPlxuICAgICAge3JlY29yZD8ucGFyYW1zLmlzTmV3ID8gKFxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJtZW1iZXJzaGlwX251bWJlclwiPk1lbWJlcnNoaXAgTnVtYmVyPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBpZD1cIm1lbWJlcnNoaXBfbnVtYmVyXCJcbiAgICAgICAgICAgICAgbmFtZT1cIm1lbWJlcnNoaXBfbnVtYmVyXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBtZW1iZXJzaGlwIG51bWJlclwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cIm1lbWJlcnNoaXBfY2VydGlmaWNhdGVcIj5cbiAgICAgICAgICAgICAgTWVtYmVyc2hpcCBDZXJ0aWZpY2F0ZVxuICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBpZD1cIm1lbWJlcnNoaXBfY2VydGlmaWNhdGVcIlxuICAgICAgICAgICAgICBuYW1lPVwibWVtYmVyc2hpcF9jZXJ0aWZpY2F0ZVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKiwgYXBwbGljYXRpb24vcGRmXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG10PVwibWRcIiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICBTdWJtaXRcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgKSA6IChcbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG10PVwibWRcIiBvbkNsaWNrPXtoYW5kbGVBcHByb3ZlfT5cbiAgICAgICAgICBDb25maXJtIEFwcHJvdmVcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwcm92ZU1lbWJlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIEJveCxcbiAgRm9ybUdyb3VwLFxuICBMYWJlbCxcbiAgVGV4dEFyZWEsXG4gIEJ1dHRvbixcbn0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcbmltcG9ydCB7IEFjdGlvblByb3BzIH0gZnJvbSBcImFkbWluanNcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgUmVqZWN0TWVtYmVyID0gKHByb3BzOiBBY3Rpb25Qcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGFwaV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudDogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBheGlvc1xuICAgICAgLnBvc3QoXG4gICAgICAgIGAke2FwaV91cmx9L2FkbWluL2FwaS9yZXNvdXJjZXMvJHtyZXNvdXJjZS5pZH0vcmVjb3Jkcy8ke3JlY29yZD8ucGFyYW1zLl9pZH0vZGVsZXRlYFxuICAgICAgKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke2FwaV91cmx9L2FkbWluL3Jlc291cmNlcy8ke3Jlc291cmNlLmlkfWA7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgd2lkdGg9ezEgLyAyfSBwPVwibGdcIiBtPVwiYXV0b1wiIG10PVwieHhsXCI+XG4gICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cInJlamVjdGlvbl9tZXNzYWdlXCI+UmVqZWN0aW9uIE1lc3NhZ2U8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgaWQ9XCJyZWplY3Rpb25fbWVzc2FnZVwiXG4gICAgICAgICAgICBuYW1lPVwicmVqZWN0aW9uX21lc3NhZ2VcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciByZWplY3Rpb24gbWVzc2FnZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBtdD1cIm1kXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgIFN1Ym1pdFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlamVjdE1lbWJlcjtcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IERyb3Bab25lSXRlbSwgTG9hZGVyLCBCb3gsIEJ1dHRvbiwgRHJvcFpvbmUsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBJbXBvcnRDb21wb25lbnQgPSAoeyByZXNvdXJjZSB9KSA9PiB7XG4gICAgY29uc3QgW2ZpbGUsIHNldEZpbGVdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICAgIGNvbnN0IFtpc0ZldGNoaW5nLCBzZXRGZXRjaGluZ10gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IG9uVXBsb2FkID0gKHVwbG9hZGVkRmlsZSkgPT4ge1xuICAgICAgICBzZXRGaWxlKHVwbG9hZGVkRmlsZT8uWzBdID8/IG51bGwpO1xuICAgIH07XG4gICAgY29uc3Qgb25TdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0RGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgaW1wb3J0RGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlPy5uYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IG5ldyBBcGlDbGllbnQoKS5yZXNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2ltcG9ydCcsXG4gICAgICAgICAgICAgICAgZGF0YTogaW1wb3J0RGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6ICdJbXBvcnRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiBlLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmV0Y2hpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgaWYgKGlzRmV0Y2hpbmcpIHtcbiAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz47XG4gICAgfVxuICAgIHJldHVybiAoPEJveCBtYXJnaW49XCJhdXRvXCIgbWF4V2lkdGg9ezYwMH0gZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIj5cbiAgICAgIDxEcm9wWm9uZSBmaWxlcz17W119IG9uQ2hhbmdlPXtvblVwbG9hZH0gbXVsdGlwbGU9e2ZhbHNlfS8+XG4gICAgICB7ZmlsZSAmJiAoPERyb3Bab25lSXRlbSBmaWxlPXtmaWxlfSBmaWxlbmFtZT17ZmlsZS5uYW1lfSBvblJlbW92ZT17KCkgPT4gc2V0RmlsZShudWxsKX0vPil9XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBtPXsxMH0+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17b25TdWJtaXR9IGRpc2FibGVkPXshZmlsZSB8fCBpc0ZldGNoaW5nfT5cbiAgICAgICAgICBVcGxvYWRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEltcG9ydENvbXBvbmVudDtcbiIsImZ1bmN0aW9uIF90eXBlb2Yobykge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5leHBvcnQgeyBfdHlwZW9mIGFzIGRlZmF1bHQgfTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIHZhbHVlIGEgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS4gVGhlIGZ1bmN0aW9uIHdvcmtzIGZvciBkYXRlcyB0cmFuc2ZlcnJlZCBhY3Jvc3MgaWZyYW1lcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBkYXRlXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYW4gaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKE5hTikpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHNvbWUgdmFsdWU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoJzIwMTQtMDItMzEnKVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYW4gb2JqZWN0OlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKHt9KVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0RhdGUodmFsdWUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgX3R5cGVvZih2YWx1ZSkgPT09ICdvYmplY3QnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJztcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCBfdHlwZW9mKGFyZ3VtZW50KSA9PT0gJ29iamVjdCcgJiYgYXJnU3RyID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICgodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IFN0cmluZ10nKSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJTdGFydGluZyB3aXRoIHYyLjAuMC1iZXRhLjEgZGF0ZS1mbnMgZG9lc24ndCBhY2NlcHQgc3RyaW5ncyBhcyBkYXRlIGFyZ3VtZW50cy4gUGxlYXNlIHVzZSBgcGFyc2VJU09gIHRvIHBhcnNlIHN0cmluZ3MuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI3N0cmluZy1hcmd1bWVudHNcIik7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn0iLCJpbXBvcnQgaXNEYXRlIGZyb20gXCIuLi9pc0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNWYWxpZFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB2YWxpZD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgZmFsc2UgaWYgYXJndW1lbnQgaXMgSW52YWxpZCBEYXRlIGFuZCB0cnVlIG90aGVyd2lzZS5cbiAqIEFyZ3VtZW50IGlzIGNvbnZlcnRlZCB0byBEYXRlIHVzaW5nIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGV9XG4gKiBJbnZhbGlkIERhdGUgaXMgYSBEYXRlLCB3aG9zZSB0aW1lIHZhbHVlIGlzIE5hTi5cbiAqXG4gKiBUaW1lIHZhbHVlIG9mIERhdGU6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuOS4xLjFcbiAqXG4gKiBAcGFyYW0geyp9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHZhbGlkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgyMDE0LCAxLCAzMSkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWx1ZSwgY29udmVydGFibGUgaW50byBhIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKDEzOTM4MDQ4MDAwMDApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNWYWxpZChkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIGlmICghaXNEYXRlKGRpcnR5RGF0ZSkgJiYgdHlwZW9mIGRpcnR5RGF0ZSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgcmV0dXJuICFpc05hTihOdW1iZXIoZGF0ZSkpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvSW50ZWdlcihkaXJ0eU51bWJlcikge1xuICBpZiAoZGlydHlOdW1iZXIgPT09IG51bGwgfHwgZGlydHlOdW1iZXIgPT09IHRydWUgfHwgZGlydHlOdW1iZXIgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG4gIHJldHVybiBudW1iZXIgPCAwID8gTWF0aC5jZWlsKG51bWJlcikgOiBNYXRoLmZsb29yKG51bWJlcik7XG59IiwiaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgYWRkTWlsbGlzZWNvbmRzXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byBiZSBhZGRlZC4gUG9zaXRpdmUgZGVjaW1hbHMgd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmZsb29yYCwgZGVjaW1hbHMgbGVzcyB0aGFuIHplcm8gd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmNlaWxgLlxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaWxsaXNlY29uZHMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDc1MCBtaWxsaXNlY29uZHMgdG8gMTAgSnVseSAyMDE0IDEyOjQ1OjMwLjAwMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGFkZE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAzMCwgMCksIDc1MClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ1OjMwLjc1MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIHRpbWVzdGFtcCA9IHRvRGF0ZShkaXJ0eURhdGUpLmdldFRpbWUoKTtcbiAgdmFyIGFtb3VudCA9IHRvSW50ZWdlcihkaXJ0eUFtb3VudCk7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyBhbW91bnQpO1xufSIsImltcG9ydCBhZGRNaWxsaXNlY29uZHMgZnJvbSBcIi4uL2FkZE1pbGxpc2Vjb25kcy9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHN1Yk1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byBiZSBzdWJ0cmFjdGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbGxpc2Vjb25kcyBzdWJ0cmFjdGVkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDc1MCBtaWxsaXNlY29uZHMgZnJvbSAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogY29uc3QgcmVzdWx0ID0gc3ViTWlsbGlzZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgNDUsIDMwLCAwKSwgNzUwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6NDU6MjkuMjUwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN1Yk1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgYW1vdW50ID0gdG9JbnRlZ2VyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIC1hbW91bnQpO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG52YXIgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDRGF5T2ZZZWFyKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlllYXJUaW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIGRpZmZlcmVuY2UgPSB0aW1lc3RhbXAgLSBzdGFydE9mWWVhclRpbWVzdGFtcDtcbiAgcmV0dXJuIE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIE1JTExJU0VDT05EU19JTl9EQVkpICsgMTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ0lTT1dlZWsoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgd2Vla1N0YXJ0c09uID0gMTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRheSA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gZGlmZik7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ0lTT1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENJU09XZWVrWWVhcihkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIgKyAxLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZlVUQ0lTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhcik7XG4gIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDE7XG4gIH1cbn0iLCJpbXBvcnQgZ2V0VVRDSVNPV2Vla1llYXIgZnJvbSBcIi4uL2dldFVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ0lTT1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0T2ZVVENJU09XZWVrWWVhcihkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciB5ZWFyID0gZ2V0VVRDSVNPV2Vla1llYXIoZGlydHlEYXRlKTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeSA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIGRhdGUgPSBzdGFydE9mVVRDSVNPV2Vlayhmb3VydGhPZkphbnVhcnkpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2Vla1llYXIgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENJU09XZWVrKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRpZmYgPSBzdGFydE9mVVRDSVNPV2VlayhkYXRlKS5nZXRUaW1lKCkgLSBzdGFydE9mVVRDSVNPV2Vla1llYXIoZGF0ZSkuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBNSUxMSVNFQ09ORFNfSU5fV0VFSykgKyAxO1xufSIsInZhciBkZWZhdWx0T3B0aW9ucyA9IHt9O1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vZGVmYXVsdE9wdGlvbnMvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0T2ZVVENXZWVrKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX3JlZjIsIF9yZWYzLCBfb3B0aW9ucyR3ZWVrU3RhcnRzT24sIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkbG9jYWxlJG9wdGlvLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDI7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgd2Vla1N0YXJ0c09uID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJHdlZWtTdGFydHNPbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9vcHRpb25zJHdlZWtTdGFydHNPbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkd2Vla1N0YXJ0c09uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDApO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMCBhbmQgNiBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKHdlZWtTdGFydHNPbiA+PSAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd3ZWVrU3RhcnRzT24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDYgaW5jbHVzaXZlbHknKTtcbiAgfVxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vZGVmYXVsdE9wdGlvbnMvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ1dlZWtZZWFyKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX3JlZjIsIF9yZWYzLCBfb3B0aW9ucyRmaXJzdFdlZWtDb24sIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkbG9jYWxlJG9wdGlvLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDI7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgeWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgdmFyIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9IHRvSW50ZWdlcigoX3JlZiA9IChfcmVmMiA9IChfcmVmMyA9IChfb3B0aW9ucyRmaXJzdFdlZWtDb24gPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyRmaXJzdFdlZWtDb24gIT09IHZvaWQgMCA/IF9vcHRpb25zJGZpcnN0V2Vla0NvbiA6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPSBfb3B0aW9ucyRsb2NhbGUub3B0aW9ucykgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlJG9wdGlvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfb3B0aW9ucyRsb2NhbGUkb3B0aW8uZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMyAhPT0gdm9pZCAwID8gX3JlZjMgOiBkZWZhdWx0T3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYyICE9PSB2b2lkIDAgPyBfcmVmMiA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPSBkZWZhdWx0T3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPSBfZGVmYXVsdE9wdGlvbnMkbG9jYWwub3B0aW9ucykgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RlZmF1bHRPcHRpb25zJGxvY2FsMi5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiAxKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDEgYW5kIDcgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoIShmaXJzdFdlZWtDb250YWluc0RhdGUgPj0gMSAmJiBmaXJzdFdlZWtDb250YWluc0RhdGUgPD0gNykpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignZmlyc3RXZWVrQ29udGFpbnNEYXRlIG11c3QgYmUgYmV0d2VlbiAxIGFuZCA3IGluY2x1c2l2ZWx5Jyk7XG4gIH1cbiAgdmFyIGZpcnN0V2Vla09mTmV4dFllYXIgPSBuZXcgRGF0ZSgwKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRVVENGdWxsWWVhcih5ZWFyICsgMSwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vla09mTmV4dFllYXIsIG9wdGlvbnMpO1xuICB2YXIgZmlyc3RXZWVrT2ZUaGlzWWVhciA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWtPZlRoaXNZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mVGhpc1llYXIgPSBzdGFydE9mVVRDV2VlayhmaXJzdFdlZWtPZlRoaXNZZWFyLCBvcHRpb25zKTtcbiAgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDE7XG4gIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufSIsImltcG9ydCBnZXRVVENXZWVrWWVhciBmcm9tIFwiLi4vZ2V0VVRDV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ1dlZWtZZWFyKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX3JlZjIsIF9yZWYzLCBfb3B0aW9ucyRmaXJzdFdlZWtDb24sIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkbG9jYWxlJG9wdGlvLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDI7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgZmlyc3RXZWVrQ29udGFpbnNEYXRlID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDEpO1xuICB2YXIgeWVhciA9IGdldFVUQ1dlZWtZZWFyKGRpcnR5RGF0ZSwgb3B0aW9ucyk7XG4gIHZhciBmaXJzdFdlZWsgPSBuZXcgRGF0ZSgwKTtcbiAgZmlyc3RXZWVrLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vlay5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIGRhdGUgPSBzdGFydE9mVVRDV2VlayhmaXJzdFdlZWssIG9wdGlvbnMpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDV2Vla1llYXIgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENXZWVrKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRpZmYgPSBzdGFydE9mVVRDV2VlayhkYXRlLCBvcHRpb25zKS5nZXRUaW1lKCkgLSBzdGFydE9mVVRDV2Vla1llYXIoZGF0ZSwgb3B0aW9ucykuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBNSUxMSVNFQ09ORFNfSU5fV0VFSykgKyAxO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICB2YXIgc2lnbiA9IG51bWJlciA8IDAgPyAnLScgOiAnJztcbiAgdmFyIG91dHB1dCA9IE1hdGguYWJzKG51bWJlcikudG9TdHJpbmcoKTtcbiAgd2hpbGUgKG91dHB1dC5sZW5ndGggPCB0YXJnZXRMZW5ndGgpIHtcbiAgICBvdXRwdXQgPSAnMCcgKyBvdXRwdXQ7XG4gIH1cbiAgcmV0dXJuIHNpZ24gKyBvdXRwdXQ7XG59IiwiaW1wb3J0IGFkZExlYWRpbmdaZXJvcyBmcm9tIFwiLi4vLi4vYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzXCI7XG4vKlxuICogfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgYSAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgfCAgQSogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZCAgfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgfCAgRCAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaCAgfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgfCAgSCAgfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbSAgfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTSAgfCBNb250aCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgcyAgfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgfCAgUyAgfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgfFxuICogfCAgeSAgfCBZZWFyIChhYnMpICAgICAgICAgICAgICAgICAgICAgfCAgWSAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICogYXJlIG5vdCBpbXBsZW1lbnRlZCBidXQgcmVzZXJ2ZWQgYnkgVW5pY29kZSBzdGFuZGFyZC5cbiAqL1xudmFyIGZvcm1hdHRlcnMgPSB7XG4gIC8vIFllYXJcbiAgeTogZnVuY3Rpb24geShkYXRlLCB0b2tlbikge1xuICAgIC8vIEZyb20gaHR0cDovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS0zMS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9Gb3JtYXRfdG9rZW5zXG4gICAgLy8gfCBZZWFyICAgICB8ICAgICB5IHwgeXkgfCAgIHl5eSB8ICB5eXl5IHwgeXl5eXkgfFxuICAgIC8vIHwtLS0tLS0tLS0tfC0tLS0tLS18LS0tLXwtLS0tLS0tfC0tLS0tLS18LS0tLS0tLXxcbiAgICAvLyB8IEFEIDEgICAgIHwgICAgIDEgfCAwMSB8ICAgMDAxIHwgIDAwMDEgfCAwMDAwMSB8XG4gICAgLy8gfCBBRCAxMiAgICB8ICAgIDEyIHwgMTIgfCAgIDAxMiB8ICAwMDEyIHwgMDAwMTIgfFxuICAgIC8vIHwgQUQgMTIzICAgfCAgIDEyMyB8IDIzIHwgICAxMjMgfCAgMDEyMyB8IDAwMTIzIHxcbiAgICAvLyB8IEFEIDEyMzQgIHwgIDEyMzQgfCAzNCB8ICAxMjM0IHwgIDEyMzQgfCAwMTIzNCB8XG4gICAgLy8gfCBBRCAxMjM0NSB8IDEyMzQ1IHwgNDUgfCAxMjM0NSB8IDEyMzQ1IHwgMTIzNDUgfFxuXG4gICAgdmFyIHNpZ25lZFllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICB2YXIgeWVhciA9IHNpZ25lZFllYXIgPiAwID8gc2lnbmVkWWVhciA6IDEgLSBzaWduZWRZZWFyO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModG9rZW4gPT09ICd5eScgPyB5ZWFyICUgMTAwIDogeWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gTW9udGhcbiAgTTogZnVuY3Rpb24gTShkYXRlLCB0b2tlbikge1xuICAgIHZhciBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICByZXR1cm4gdG9rZW4gPT09ICdNJyA/IFN0cmluZyhtb250aCArIDEpIDogYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gIH0sXG4gIC8vIERheSBvZiB0aGUgbW9udGhcbiAgZDogZnVuY3Rpb24gZChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENEYXRlKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIGEoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF0ZS5nZXRVVENIb3VycygpIC8gMTIgPj0gMSA/ICdwbScgOiAnYW0nO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAnYWEnOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjYXNlICdhYWEnOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgICAgY2FzZSAnYWFhYWEnOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlWzBdO1xuICAgICAgY2FzZSAnYWFhYSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlID09PSAnYW0nID8gJ2EubS4nIDogJ3AubS4nO1xuICAgIH1cbiAgfSxcbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gaChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENIb3VycygpICUgMTIgfHwgMTIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEg6IGZ1bmN0aW9uIEgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDSG91cnMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIG0oZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDTWludXRlcygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBTZWNvbmRcbiAgczogZnVuY3Rpb24gcyhkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENTZWNvbmRzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEZyYWN0aW9uIG9mIHNlY29uZFxuICBTOiBmdW5jdGlvbiBTKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIG51bWJlck9mRGlnaXRzID0gdG9rZW4ubGVuZ3RoO1xuICAgIHZhciBtaWxsaXNlY29uZHMgPSBkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICAgIHZhciBmcmFjdGlvbmFsU2Vjb25kcyA9IE1hdGguZmxvb3IobWlsbGlzZWNvbmRzICogTWF0aC5wb3coMTAsIG51bWJlck9mRGlnaXRzIC0gMykpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZnJhY3Rpb25hbFNlY29uZHMsIHRva2VuLmxlbmd0aCk7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXR0ZXJzOyIsImltcG9ydCBnZXRVVENEYXlPZlllYXIgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDRGF5T2ZZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VVRDSVNPV2VlayBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENJU09XZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VVRDSVNPV2Vla1llYXIgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENXZWVrIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENXZWVrWWVhciBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IGFkZExlYWRpbmdaZXJvcyBmcm9tIFwiLi4vLi4vYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzXCI7XG5pbXBvcnQgbGlnaHRGb3JtYXR0ZXJzIGZyb20gXCIuLi9saWdodEZvcm1hdHRlcnMvaW5kZXguanNcIjtcbnZhciBkYXlQZXJpb2RFbnVtID0ge1xuICBhbTogJ2FtJyxcbiAgcG06ICdwbScsXG4gIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICBub29uOiAnbm9vbicsXG4gIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICBuaWdodDogJ25pZ2h0J1xufTtcbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8IE1pbGxpc2Vjb25kcyBpbiBkYXkgICAgICAgICAgICB8XG4gKiB8ICBiICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICB8ICBCICB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICB8XG4gKiB8ICBjICB8IFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrICB8ICBDKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBlICB8IExvY2FsIGRheSBvZiB3ZWVrICAgICAgICAgICAgICB8ICBFICB8IERheSBvZiB3ZWVrICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBmICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBGKiB8IERheSBvZiB3ZWVrIGluIG1vbnRoICAgICAgICAgICB8XG4gKiB8ICBnKiB8IE1vZGlmaWVkIEp1bGlhbiBkYXkgICAgICAgICAgICB8ICBHICB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBpISB8IElTTyBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgICB8ICBJISB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICB8XG4gKiB8ICBqKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8ICBKKiB8IExvY2FsaXplZCBob3VyIHcvbyBkYXkgcGVyaW9kICB8XG4gKiB8ICBrICB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICB8ICBLICB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBsKiB8IChkZXByZWNhdGVkKSAgICAgICAgICAgICAgICAgICB8ICBMICB8IFN0YW5kLWFsb25lIG1vbnRoICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBOICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBvISB8IE9yZGluYWwgbnVtYmVyIG1vZGlmaWVyICAgICAgICB8ICBPICB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICB8XG4gKiB8ICBwISB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICB8ICBQISB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICB8XG4gKiB8ICBxICB8IFN0YW5kLWFsb25lIHF1YXJ0ZXIgICAgICAgICAgICB8ICBRICB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICByKiB8IFJlbGF0ZWQgR3JlZ29yaWFuIHllYXIgICAgICAgICB8ICBSISB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB0ISB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICB8ICBUISB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICB8XG4gKiB8ICB1ICB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICB8ICBVKiB8IEN5Y2xpYyB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICB2KiB8IFRpbWV6b25lIChnZW5lcmljIG5vbi1sb2NhdC4pICB8ICBWKiB8IFRpbWV6b25lIChsb2NhdGlvbikgICAgICAgICAgICB8XG4gKiB8ICB3ICB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICB8ICBXKiB8IFdlZWsgb2YgbW9udGggICAgICAgICAgICAgICAgICB8XG4gKiB8ICB4ICB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICB8ICBYICB8IFRpbWV6b25lIChJU08tODYwMSkgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICB8XG4gKiB8ICB6ICB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSB8ICBaKiB8IFRpbWV6b25lIChhbGlhc2VzKSAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICEgYXJlIG5vbi1zdGFuZGFyZCwgYnV0IGltcGxlbWVudGVkIGJ5IGRhdGUtZm5zOlxuICogLSBgb2AgbW9kaWZpZXMgdGhlIHByZXZpb3VzIHRva2VuIHRvIHR1cm4gaXQgaW50byBhbiBvcmRpbmFsIChzZWUgYGZvcm1hdGAgZG9jcylcbiAqIC0gYGlgIGlzIElTTyBkYXkgb2Ygd2Vlay4gRm9yIGBpYCBhbmQgYGlpYCBpcyByZXR1cm5zIG51bWVyaWMgSVNPIHdlZWsgZGF5cyxcbiAqICAgaS5lLiA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSwgZXRjLlxuICogLSBgSWAgaXMgSVNPIHdlZWsgb2YgeWVhciwgYXMgb3Bwb3NlZCB0byBgd2Agd2hpY2ggaXMgbG9jYWwgd2VlayBvZiB5ZWFyLlxuICogLSBgUmAgaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsIGFzIG9wcG9zZWQgdG8gYFlgIHdoaWNoIGlzIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiAgIGBSYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYElgIGFuZCBgaWBcbiAqICAgZm9yIHVuaXZlcnNhbCBJU08gd2Vlay1udW1iZXJpbmcgZGF0ZSwgd2hlcmVhc1xuICogICBgWWAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB3YCBhbmQgYGVgXG4gKiAgIGZvciB3ZWVrLW51bWJlcmluZyBkYXRlIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUuXG4gKiAtIGBQYCBpcyBsb25nIGxvY2FsaXplZCBkYXRlIGZvcm1hdFxuICogLSBgcGAgaXMgbG9uZyBsb2NhbGl6ZWQgdGltZSBmb3JtYXRcbiAqL1xuXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gRXJhXG4gIEc6IGZ1bmN0aW9uIEcoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGVyYSA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA+IDAgPyAxIDogMDtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBBRCwgQkNcbiAgICAgIGNhc2UgJ0cnOlxuICAgICAgY2FzZSAnR0cnOlxuICAgICAgY2FzZSAnR0dHJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEEsIEJcbiAgICAgIGNhc2UgJ0dHR0dHJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdydcbiAgICAgICAgfSk7XG4gICAgICAvLyBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdFxuICAgICAgY2FzZSAnR0dHRyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBZZWFyXG4gIHk6IGZ1bmN0aW9uIHkoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09ICd5bycpIHtcbiAgICAgIHZhciBzaWduZWRZZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICAgIHZhciB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih5ZWFyLCB7XG4gICAgICAgIHVuaXQ6ICd5ZWFyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMueShkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAgWTogZnVuY3Rpb24gWShkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2lnbmVkV2Vla1llYXIgPSBnZXRVVENXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIHZhciB3ZWVrWWVhciA9IHNpZ25lZFdlZWtZZWFyID4gMCA/IHNpZ25lZFdlZWtZZWFyIDogMSAtIHNpZ25lZFdlZWtZZWFyO1xuXG4gICAgLy8gVHdvIGRpZ2l0IHllYXJcbiAgICBpZiAodG9rZW4gPT09ICdZWScpIHtcbiAgICAgIHZhciB0d29EaWdpdFllYXIgPSB3ZWVrWWVhciAlIDEwMDtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModHdvRGlnaXRZZWFyLCAyKTtcbiAgICB9XG5cbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gJ1lvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2Vla1llYXIsIHtcbiAgICAgICAgdW5pdDogJ3llYXInXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAgUjogZnVuY3Rpb24gUihkYXRlLCB0b2tlbikge1xuICAgIHZhciBpc29XZWVrWWVhciA9IGdldFVUQ0lTT1dlZWtZZWFyKGRhdGUpO1xuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEV4dGVuZGVkIHllYXIuIFRoaXMgaXMgYSBzaW5nbGUgbnVtYmVyIGRlc2lnbmF0aW5nIHRoZSB5ZWFyIG9mIHRoaXMgY2FsZW5kYXIgc3lzdGVtLlxuICAvLyBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYHlgIGFuZCBgdWAgbG9jYWxpemVycyBhcmUgQi5DLiB5ZWFyczpcbiAgLy8gfCBZZWFyIHwgYHlgIHwgYHVgIHxcbiAgLy8gfC0tLS0tLXwtLS0tLXwtLS0tLXxcbiAgLy8gfCBBQyAxIHwgICAxIHwgICAxIHxcbiAgLy8gfCBCQyAxIHwgICAxIHwgICAwIHxcbiAgLy8gfCBCQyAyIHwgICAyIHwgIC0xIHxcbiAgLy8gQWxzbyBgeXlgIGFsd2F5cyByZXR1cm5zIHRoZSBsYXN0IHR3byBkaWdpdHMgb2YgYSB5ZWFyLFxuICAvLyB3aGlsZSBgdXVgIHBhZHMgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIDIgY2hhcmFjdGVycyBhbmQgcmV0dXJucyBvdGhlciB5ZWFycyB1bmNoYW5nZWQuXG4gIHU6IGZ1bmN0aW9uIHUoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIFF1YXJ0ZXJcbiAgUTogZnVuY3Rpb24gUShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRVVENNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlICdRJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhxdWFydGVyKTtcbiAgICAgIC8vIDAxLCAwMiwgMDMsIDA0XG4gICAgICBjYXNlICdRUSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgJ1FvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwge1xuICAgICAgICAgIHVuaXQ6ICdxdWFydGVyJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlICdRUVEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlICdRUVFRUSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi5cbiAgICAgIGNhc2UgJ1FRUVEnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gU3RhbmQtYWxvbmUgcXVhcnRlclxuICBxOiBmdW5jdGlvbiBxKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgJ3EnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgJ3FxJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhxdWFydGVyLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAzcmQsIDR0aFxuICAgICAgY2FzZSAncW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7XG4gICAgICAgICAgdW5pdDogJ3F1YXJ0ZXInXG4gICAgICAgIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgJ3FxcSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyAxLCAyLCAzLCA0IChuYXJyb3cgcXVhcnRlcjsgY291bGQgYmUgbm90IG51bWVyaWNhbClcbiAgICAgIGNhc2UgJ3FxcXFxJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSAncXFxcSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBNb250aFxuICBNOiBmdW5jdGlvbiBNKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdNJzpcbiAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5NKGRhdGUsIHRva2VuKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDEydGhcbiAgICAgIGNhc2UgJ01vJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7XG4gICAgICAgICAgdW5pdDogJ21vbnRoJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSAnTU1NJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSiwgRiwgLi4uLCBEXG4gICAgICBjYXNlICdNTU1NTSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlclxuICAgICAgY2FzZSAnTU1NTSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFN0YW5kLWFsb25lIG1vbnRoXG4gIEw6IGZ1bmN0aW9uIEwoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgJ0wnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vbnRoICsgMSk7XG4gICAgICAvLyAwMSwgMDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgJ0xMJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgMTJ0aFxuICAgICAgY2FzZSAnTG8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihtb250aCArIDEsIHtcbiAgICAgICAgICB1bml0OiAnbW9udGgnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgICBjYXNlICdMTEwnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBKLCBGLCAuLi4sIERcbiAgICAgIGNhc2UgJ0xMTExMJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlICdMTExMJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gTG9jYWwgd2VlayBvZiB5ZWFyXG4gIHc6IGZ1bmN0aW9uIHcoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIHdlZWsgPSBnZXRVVENXZWVrKGRhdGUsIG9wdGlvbnMpO1xuICAgIGlmICh0b2tlbiA9PT0gJ3dvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2Vlaywge1xuICAgICAgICB1bml0OiAnd2VlaydcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIElTTyB3ZWVrIG9mIHllYXJcbiAgSTogZnVuY3Rpb24gSShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaXNvV2VlayA9IGdldFVUQ0lTT1dlZWsoZGF0ZSk7XG4gICAgaWYgKHRva2VuID09PSAnSW8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29XZWVrLCB7XG4gICAgICAgIHVuaXQ6ICd3ZWVrJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiBkKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ2RvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENEYXRlKCksIHtcbiAgICAgICAgdW5pdDogJ2RhdGUnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5kKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHllYXJcbiAgRDogZnVuY3Rpb24gRChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZGF5T2ZZZWFyID0gZ2V0VVRDRGF5T2ZZZWFyKGRhdGUpO1xuICAgIGlmICh0b2tlbiA9PT0gJ0RvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF5T2ZZZWFyLCB7XG4gICAgICAgIHVuaXQ6ICdkYXlPZlllYXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXlPZlllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIERheSBvZiB3ZWVrXG4gIEU6IGZ1bmN0aW9uIEUoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gVHVlXG4gICAgICBjYXNlICdFJzpcbiAgICAgIGNhc2UgJ0VFJzpcbiAgICAgIGNhc2UgJ0VFRSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSAnRUVFRUUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSAnRUVFRUVFJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3Nob3J0JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlICdFRUVFJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbCBkYXkgb2Ygd2Vla1xuICBlOiBmdW5jdGlvbiBlKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBkYXlPZldlZWsgPSBkYXRlLmdldFVUQ0RheSgpO1xuICAgIHZhciBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoTnRoIGRheSBvZiB3ZWVrIHdpdGggY3VycmVudCBsb2NhbGUgb3Igd2Vla1N0YXJ0c09uKVxuICAgICAgY2FzZSAnZSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSAnZWUnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGxvY2FsRGF5T2ZXZWVrLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDd0aFxuICAgICAgY2FzZSAnZW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2Vlaywge1xuICAgICAgICAgIHVuaXQ6ICdkYXknXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnZWVlJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdlZWVlZSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdlZWVlZWUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ2VlZWUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrXG4gIGM6IGZ1bmN0aW9uIGMoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgdmFyIGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChzYW1lIGFzIGluIGBlYClcbiAgICAgIGNhc2UgJ2MnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGxvY2FsRGF5T2ZXZWVrKTtcbiAgICAgIC8vIFBhZGRlZCBudW1lcmljYWwgdmFsdWVcbiAgICAgIGNhc2UgJ2NjJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDd0aFxuICAgICAgY2FzZSAnY28nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2Vlaywge1xuICAgICAgICAgIHVuaXQ6ICdkYXknXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnY2NjJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdjY2NjYyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdjY2NjY2MnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ2NjY2MnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIElTTyBkYXkgb2Ygd2Vla1xuICBpOiBmdW5jdGlvbiBpKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBkYXlPZldlZWsgPSBkYXRlLmdldFVUQ0RheSgpO1xuICAgIHZhciBpc29EYXlPZldlZWsgPSBkYXlPZldlZWsgPT09IDAgPyA3IDogZGF5T2ZXZWVrO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDJcbiAgICAgIGNhc2UgJ2knOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGlzb0RheU9mV2Vlayk7XG4gICAgICAvLyAwMlxuICAgICAgY2FzZSAnaWknOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb0RheU9mV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgICAgIC8vIDJuZFxuICAgICAgY2FzZSAnaW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29EYXlPZldlZWssIHtcbiAgICAgICAgICB1bml0OiAnZGF5J1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSAnaWlpJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdpaWlpaSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdpaWlpaWknOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ2lpaWknOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIGEoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyAncG0nIDogJ2FtJztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdhJzpcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdhYWEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSAnYWFhYWEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdhYWFhJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBBTSwgUE0sIG1pZG5pZ2h0LCBub29uXG4gIGI6IGZ1bmN0aW9uIGIoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubWlkbmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/ICdwbScgOiAnYW0nO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdiJzpcbiAgICAgIGNhc2UgJ2JiJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdiYmInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSAnYmJiYmInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdiYmJiJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBpbiB0aGUgbW9ybmluZywgaW4gdGhlIGFmdGVybm9vbiwgaW4gdGhlIGV2ZW5pbmcsIGF0IG5pZ2h0XG4gIEI6IGZ1bmN0aW9uIEIoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID49IDE3KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmV2ZW5pbmc7XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5hZnRlcm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSA0KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1vcm5pbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubmlnaHQ7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ0InOlxuICAgICAgY2FzZSAnQkInOlxuICAgICAgY2FzZSAnQkJCJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdCQkJCQic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ0JCQkInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGg6IGZ1bmN0aW9uIGgoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnaG8nKSB7XG4gICAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMjtcbiAgICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAxMjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuaChkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEg6IGZ1bmN0aW9uIEgoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnSG8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ0hvdXJzKCksIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5IKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0xMV1cbiAgSzogZnVuY3Rpb24gSyhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMjtcbiAgICBpZiAodG9rZW4gPT09ICdLbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEhvdXIgWzEtMjRdXG4gIGs6IGZ1bmN0aW9uIGsoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAyNDtcbiAgICBpZiAodG9rZW4gPT09ICdrbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIE1pbnV0ZVxuICBtOiBmdW5jdGlvbiBtKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ21vJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENNaW51dGVzKCksIHtcbiAgICAgICAgdW5pdDogJ21pbnV0ZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLm0oZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBTZWNvbmRcbiAgczogZnVuY3Rpb24gcyhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdzbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDU2Vjb25kcygpLCB7XG4gICAgICAgIHVuaXQ6ICdzZWNvbmQnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5zKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFM6IGZ1bmN0aW9uIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLlMoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYWx3YXlzIGAnWidgKVxuICBYOiBmdW5jdGlvbiBYKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgaWYgKHRpbWV6b25lT2Zmc2V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gJ1onO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSAnWCc6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWGBcbiAgICAgIGNhc2UgJ1hYWFgnOlxuICAgICAgY2FzZSAnWFgnOlxuICAgICAgICAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgWFhYYFxuICAgICAgY2FzZSAnWFhYWFgnOlxuICAgICAgY2FzZSAnWFhYJzogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYCcrMDA6MDAnYCBvciBlcXVpdmFsZW50KVxuICB4OiBmdW5jdGlvbiB4KGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgJ3gnOlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHhgXG4gICAgICBjYXNlICd4eHh4JzpcbiAgICAgIGNhc2UgJ3h4JzpcbiAgICAgICAgLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4eGBcbiAgICAgIGNhc2UgJ3h4eHh4JzpcbiAgICAgIGNhc2UgJ3h4eCc6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gVGltZXpvbmUgKEdNVClcbiAgTzogZnVuY3Rpb24gTyhkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFNob3J0XG4gICAgICBjYXNlICdPJzpcbiAgICAgIGNhc2UgJ09PJzpcbiAgICAgIGNhc2UgJ09PTyc6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlICdPT09PJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdGlvbilcbiAgejogZnVuY3Rpb24geihkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFNob3J0XG4gICAgICBjYXNlICd6JzpcbiAgICAgIGNhc2UgJ3p6JzpcbiAgICAgIGNhc2UgJ3p6eic6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlICd6enp6JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXBcbiAgdDogZnVuY3Rpb24gdChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICBUOiBmdW5jdGlvbiBUKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWVzdGFtcCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH1cbn07XG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVNob3J0KG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpIHtcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICB2YXIgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCk7XG4gIHZhciBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjA7XG4gIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpO1xuICB9XG4gIHZhciBkZWxpbWl0ZXIgPSBkaXJ0eURlbGltaXRlciB8fCAnJztcbiAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpICsgZGVsaW1pdGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpO1xufVxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpIHtcbiAgaWYgKG9mZnNldCAlIDYwID09PSAwKSB7XG4gICAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICAgIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKE1hdGguYWJzKG9mZnNldCkgLyA2MCwgMik7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpO1xufVxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkaXJ0eURlbGltaXRlcikge1xuICB2YXIgZGVsaW1pdGVyID0gZGlydHlEZWxpbWl0ZXIgfHwgJyc7XG4gIHZhciBzaWduID0gb2Zmc2V0ID4gMCA/ICctJyA6ICcrJztcbiAgdmFyIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIHZhciBob3VycyA9IGFkZExlYWRpbmdaZXJvcyhNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKSwgMik7XG4gIHZhciBtaW51dGVzID0gYWRkTGVhZGluZ1plcm9zKGFic09mZnNldCAlIDYwLCAyKTtcbiAgcmV0dXJuIHNpZ24gKyBob3VycyArIGRlbGltaXRlciArIG1pbnV0ZXM7XG59XG5leHBvcnQgZGVmYXVsdCBmb3JtYXR0ZXJzOyIsInZhciBkYXRlTG9uZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uIGRhdGVMb25nRm9ybWF0dGVyKHBhdHRlcm4sIGZvcm1hdExvbmcpIHtcbiAgc3dpdGNoIChwYXR0ZXJuKSB7XG4gICAgY2FzZSAnUCc6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHtcbiAgICAgICAgd2lkdGg6ICdzaG9ydCdcbiAgICAgIH0pO1xuICAgIGNhc2UgJ1BQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ21lZGl1bSdcbiAgICAgIH0pO1xuICAgIGNhc2UgJ1BQUCc6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHtcbiAgICAgICAgd2lkdGg6ICdsb25nJ1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFBQUCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ2Z1bGwnXG4gICAgICB9KTtcbiAgfVxufTtcbnZhciB0aW1lTG9uZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uIHRpbWVMb25nRm9ybWF0dGVyKHBhdHRlcm4sIGZvcm1hdExvbmcpIHtcbiAgc3dpdGNoIChwYXR0ZXJuKSB7XG4gICAgY2FzZSAncCc6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHtcbiAgICAgICAgd2lkdGg6ICdzaG9ydCdcbiAgICAgIH0pO1xuICAgIGNhc2UgJ3BwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ21lZGl1bSdcbiAgICAgIH0pO1xuICAgIGNhc2UgJ3BwcCc6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHtcbiAgICAgICAgd2lkdGg6ICdsb25nJ1xuICAgICAgfSk7XG4gICAgY2FzZSAncHBwcCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ2Z1bGwnXG4gICAgICB9KTtcbiAgfVxufTtcbnZhciBkYXRlVGltZUxvbmdGb3JtYXR0ZXIgPSBmdW5jdGlvbiBkYXRlVGltZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICB2YXIgbWF0Y2hSZXN1bHQgPSBwYXR0ZXJuLm1hdGNoKC8oUCspKHArKT8vKSB8fCBbXTtcbiAgdmFyIGRhdGVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMV07XG4gIHZhciB0aW1lUGF0dGVybiA9IG1hdGNoUmVzdWx0WzJdO1xuICBpZiAoIXRpbWVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGRhdGVMb25nRm9ybWF0dGVyKHBhdHRlcm4sIGZvcm1hdExvbmcpO1xuICB9XG4gIHZhciBkYXRlVGltZUZvcm1hdDtcbiAgc3dpdGNoIChkYXRlUGF0dGVybikge1xuICAgIGNhc2UgJ1AnOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHtcbiAgICAgICAgd2lkdGg6ICdzaG9ydCdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFAnOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHtcbiAgICAgICAgd2lkdGg6ICdtZWRpdW0nXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BQUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BQUFAnOlxuICAgIGRlZmF1bHQ6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ2Z1bGwnXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBkYXRlVGltZUZvcm1hdC5yZXBsYWNlKCd7e2RhdGV9fScsIGRhdGVMb25nRm9ybWF0dGVyKGRhdGVQYXR0ZXJuLCBmb3JtYXRMb25nKSkucmVwbGFjZSgne3t0aW1lfX0nLCB0aW1lTG9uZ0Zvcm1hdHRlcih0aW1lUGF0dGVybiwgZm9ybWF0TG9uZykpO1xufTtcbnZhciBsb25nRm9ybWF0dGVycyA9IHtcbiAgcDogdGltZUxvbmdGb3JtYXR0ZXIsXG4gIFA6IGRhdGVUaW1lTG9uZ0Zvcm1hdHRlclxufTtcbmV4cG9ydCBkZWZhdWx0IGxvbmdGb3JtYXR0ZXJzOyIsIi8qKlxuICogR29vZ2xlIENocm9tZSBhcyBvZiA2Ny4wLjMzOTYuODcgaW50cm9kdWNlZCB0aW1lem9uZXMgd2l0aCBvZmZzZXQgdGhhdCBpbmNsdWRlcyBzZWNvbmRzLlxuICogVGhleSB1c3VhbGx5IGFwcGVhciBmb3IgZGF0ZXMgdGhhdCBkZW5vdGUgdGltZSBiZWZvcmUgdGhlIHRpbWV6b25lcyB3ZXJlIGludHJvZHVjZWRcbiAqIChlLmcuIGZvciAnRXVyb3BlL1ByYWd1ZScgdGltZXpvbmUgdGhlIG9mZnNldCBpcyBHTVQrMDA6NTc6NDQgYmVmb3JlIDEgT2N0b2JlciAxODkxXG4gKiBhbmQgR01UKzAxOjAwOjAwIGFmdGVyIHRoYXQgZGF0ZSlcbiAqXG4gKiBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgdGhlIG9mZnNldCBpbiBtaW51dGVzIGFuZCB3b3VsZCByZXR1cm4gNTcgZm9yIHRoZSBleGFtcGxlIGFib3ZlLFxuICogd2hpY2ggd291bGQgbGVhZCB0byBpbmNvcnJlY3QgY2FsY3VsYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGltZXpvbmUgb2Zmc2V0IGluIG1pbGxpc2Vjb25kcyB0aGF0IHRha2VzIHNlY29uZHMgaW4gYWNjb3VudC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIHZhciB1dGNEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkpO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSAtIHV0Y0RhdGUuZ2V0VGltZSgpO1xufSIsInZhciBwcm90ZWN0ZWREYXlPZlllYXJUb2tlbnMgPSBbJ0QnLCAnREQnXTtcbnZhciBwcm90ZWN0ZWRXZWVrWWVhclRva2VucyA9IFsnWVknLCAnWVlZWSddO1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZERheU9mWWVhclRva2Vucy5pbmRleE9mKHRva2VuKSAhPT0gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuKHRva2VuKSB7XG4gIHJldHVybiBwcm90ZWN0ZWRXZWVrWWVhclRva2Vucy5pbmRleE9mKHRva2VuKSAhPT0gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gdGhyb3dQcm90ZWN0ZWRFcnJvcih0b2tlbiwgZm9ybWF0LCBpbnB1dCkge1xuICBpZiAodG9rZW4gPT09ICdZWVlZJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09ICdZWScpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09ICdEJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09ICdERCcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlVzZSBgZGRgIGluc3RlYWQgb2YgYEREYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH1cbn0iLCJ2YXIgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBzZWNvbmQnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICB4U2Vjb25kczoge1xuICAgIG9uZTogJzEgc2Vjb25kJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICBoYWxmQU1pbnV0ZTogJ2hhbGYgYSBtaW51dGUnLFxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiAnbGVzcyB0aGFuIGEgbWludXRlJyxcbiAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6ICcxIG1pbnV0ZScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4SG91cnM6IHtcbiAgICBvbmU6ICcxIGhvdXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4RGF5czoge1xuICAgIG9uZTogJzEgZGF5JyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBkYXlzJ1xuICB9LFxuICBhYm91dFhXZWVrczoge1xuICAgIG9uZTogJ2Fib3V0IDEgd2VlaycsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIHhXZWVrczoge1xuICAgIG9uZTogJzEgd2VlaycsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogJ2Fib3V0IDEgbW9udGgnLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgeE1vbnRoczoge1xuICAgIG9uZTogJzEgbW9udGgnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIHllYXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHllYXJzJ1xuICB9LFxuICB4WWVhcnM6IHtcbiAgICBvbmU6ICcxIHllYXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IHllYXJzJ1xuICB9LFxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgIG90aGVyOiAnb3ZlciB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogJ2FsbW9zdCAxIHllYXInLFxuICAgIG90aGVyOiAnYWxtb3N0IHt7Y291bnR9fSB5ZWFycydcbiAgfVxufTtcbnZhciBmb3JtYXREaXN0YW5jZSA9IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlKHRva2VuLCBjb3VudCwgb3B0aW9ucykge1xuICB2YXIgcmVzdWx0O1xuICB2YXIgdG9rZW5WYWx1ZSA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoJ3t7Y291bnR9fScsIGNvdW50LnRvU3RyaW5nKCkpO1xuICB9XG4gIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmFkZFN1ZmZpeCkge1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgcmV0dXJuICdpbiAnICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgJyBhZ28nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdERpc3RhbmNlOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRm9ybWF0TG9uZ0ZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgLy8gVE9ETzogUmVtb3ZlIFN0cmluZygpXG4gICAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgIHZhciBmb3JtYXQgPSBhcmdzLmZvcm1hdHNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0c1thcmdzLmRlZmF1bHRXaWR0aF07XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfTtcbn0iLCJpbXBvcnQgYnVpbGRGb3JtYXRMb25nRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRGb3JtYXRMb25nRm4vaW5kZXguanNcIjtcbnZhciBkYXRlRm9ybWF0cyA9IHtcbiAgZnVsbDogJ0VFRUUsIE1NTU0gZG8sIHknLFxuICBsb25nOiAnTU1NTSBkbywgeScsXG4gIG1lZGl1bTogJ01NTSBkLCB5JyxcbiAgc2hvcnQ6ICdNTS9kZC95eXl5J1xufTtcbnZhciB0aW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogJ2g6bW06c3MgYSB6enp6JyxcbiAgbG9uZzogJ2g6bW06c3MgYSB6JyxcbiAgbWVkaXVtOiAnaDptbTpzcyBhJyxcbiAgc2hvcnQ6ICdoOm1tIGEnXG59O1xudmFyIGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06ICd7e2RhdGV9fSwge3t0aW1lfX0nLFxuICBzaG9ydDogJ3t7ZGF0ZX19LCB7e3RpbWV9fSdcbn07XG52YXIgZm9ybWF0TG9uZyA9IHtcbiAgZGF0ZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pLFxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIGRhdGVUaW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZVRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0TG9uZzsiLCJ2YXIgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiBcIidsYXN0JyBlZWVlICdhdCcgcFwiLFxuICB5ZXN0ZXJkYXk6IFwiJ3llc3RlcmRheSBhdCcgcFwiLFxuICB0b2RheTogXCIndG9kYXkgYXQnIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ3RvbW9ycm93IGF0JyBwXCIsXG4gIG5leHRXZWVrOiBcImVlZWUgJ2F0JyBwXCIsXG4gIG90aGVyOiAnUCdcbn07XG52YXIgZm9ybWF0UmVsYXRpdmUgPSBmdW5jdGlvbiBmb3JtYXRSZWxhdGl2ZSh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpIHtcbiAgcmV0dXJuIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRSZWxhdGl2ZTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZExvY2FsaXplRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKGRpcnR5SW5kZXgsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuY29udGV4dCA/IFN0cmluZyhvcHRpb25zLmNvbnRleHQpIDogJ3N0YW5kYWxvbmUnO1xuICAgIHZhciB2YWx1ZXNBcnJheTtcbiAgICBpZiAoY29udGV4dCA9PT0gJ2Zvcm1hdHRpbmcnICYmIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlcykge1xuICAgICAgdmFyIGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCB8fCBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciB3aWR0aCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBkZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1t3aWR0aF0gfHwgYXJncy5mb3JtYXR0aW5nVmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YXIgX3dpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLnZhbHVlc1tfd2lkdGhdIHx8IGFyZ3MudmFsdWVzW19kZWZhdWx0V2lkdGhdO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sgPyBhcmdzLmFyZ3VtZW50Q2FsbGJhY2soZGlydHlJbmRleCkgOiBkaXJ0eUluZGV4O1xuICAgIC8vIEB0cy1pZ25vcmU6IEZvciBzb21lIHJlYXNvbiBUeXBlU2NyaXB0IGp1c3QgZG9uJ3Qgd2FudCB0byBtYXRjaCBpdCwgbm8gbWF0dGVyIGhvdyBoYXJkIHdlIHRyeS4gSSBjaGFsbGVuZ2UgeW91IHRvIHRyeSB0byByZW1vdmUgaXQhXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5W2luZGV4XTtcbiAgfTtcbn0iLCJpbXBvcnQgYnVpbGRMb2NhbGl6ZUZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qc1wiO1xudmFyIGVyYVZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ0InLCAnQSddLFxuICBhYmJyZXZpYXRlZDogWydCQycsICdBRCddLFxuICB3aWRlOiBbJ0JlZm9yZSBDaHJpc3QnLCAnQW5ubyBEb21pbmknXVxufTtcbnZhciBxdWFydGVyVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnMScsICcyJywgJzMnLCAnNCddLFxuICBhYmJyZXZpYXRlZDogWydRMScsICdRMicsICdRMycsICdRNCddLFxuICB3aWRlOiBbJzFzdCBxdWFydGVyJywgJzJuZCBxdWFydGVyJywgJzNyZCBxdWFydGVyJywgJzR0aCBxdWFydGVyJ11cbn07XG5cbi8vIE5vdGU6IGluIEVuZ2xpc2gsIHRoZSBuYW1lcyBvZiBkYXlzIG9mIHRoZSB3ZWVrIGFuZCBtb250aHMgYXJlIGNhcGl0YWxpemVkLlxuLy8gSWYgeW91IGFyZSBtYWtpbmcgYSBuZXcgbG9jYWxlIGJhc2VkIG9uIHRoaXMgb25lLCBjaGVjayBpZiB0aGUgc2FtZSBpcyB0cnVlIGZvciB0aGUgbGFuZ3VhZ2UgeW91J3JlIHdvcmtpbmcgb24uXG4vLyBHZW5lcmFsbHksIGZvcm1hdHRlZCBkYXRlcyBzaG91bGQgbG9vayBsaWtlIHRoZXkgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzZW50ZW5jZSxcbi8vIGUuZy4gaW4gU3BhbmlzaCBsYW5ndWFnZSB0aGUgd2Vla2RheXMgYW5kIG1vbnRocyBzaG91bGQgYmUgaW4gdGhlIGxvd2VyY2FzZS5cbnZhciBtb250aFZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXG4gIHdpZGU6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG59O1xudmFyIGRheVZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgc2hvcnQ6IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gIHdpZGU6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxufTtcbnZhciBkYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfVxufTtcbnZhciBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogJ2EnLFxuICAgIHBtOiAncCcsXG4gICAgbWlkbmlnaHQ6ICdtaScsXG4gICAgbm9vbjogJ24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiAnQU0nLFxuICAgIHBtOiAnUE0nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiAnYS5tLicsXG4gICAgcG06ICdwLm0uJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH1cbn07XG52YXIgb3JkaW5hbE51bWJlciA9IGZ1bmN0aW9uIG9yZGluYWxOdW1iZXIoZGlydHlOdW1iZXIsIF9vcHRpb25zKSB7XG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuXG4gIC8vIElmIG9yZGluYWwgbnVtYmVycyBkZXBlbmQgb24gY29udGV4dCwgZm9yIGV4YW1wbGUsXG4gIC8vIGlmIHRoZXkgYXJlIGRpZmZlcmVudCBmb3IgZGlmZmVyZW50IGdyYW1tYXRpY2FsIGdlbmRlcnMsXG4gIC8vIHVzZSBgb3B0aW9ucy51bml0YC5cbiAgLy9cbiAgLy8gYHVuaXRgIGNhbiBiZSAneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF0ZScsICdkYXlPZlllYXInLFxuICAvLyAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcuXG5cbiAgdmFyIHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3N0JztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICduZCc7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAncmQnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgJ3RoJztcbn07XG52YXIgbG9jYWxpemUgPSB7XG4gIG9yZGluYWxOdW1iZXI6IG9yZGluYWxOdW1iZXIsXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgcXVhcnRlcjogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IHF1YXJ0ZXJWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZScsXG4gICAgYXJndW1lbnRDYWxsYmFjazogZnVuY3Rpb24gYXJndW1lbnRDYWxsYmFjayhxdWFydGVyKSB7XG4gICAgICByZXR1cm4gcXVhcnRlciAtIDE7XG4gICAgfVxuICB9KSxcbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgZGF5OiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5VmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXlQZXJpb2Q6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZScsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiAnd2lkZSdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBsb2NhbGl6ZTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgIHZhciBtYXRjaFBhdHRlcm4gPSB3aWR0aCAmJiBhcmdzLm1hdGNoUGF0dGVybnNbd2lkdGhdIHx8IGFyZ3MubWF0Y2hQYXR0ZXJuc1thcmdzLmRlZmF1bHRNYXRjaFdpZHRoXTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2gobWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcbiAgICB2YXIgcGFyc2VQYXR0ZXJucyA9IHdpZHRoICYmIGFyZ3MucGFyc2VQYXR0ZXJuc1t3aWR0aF0gfHwgYXJncy5wYXJzZVBhdHRlcm5zW2FyZ3MuZGVmYXVsdFBhcnNlV2lkdGhdO1xuICAgIHZhciBrZXkgPSBBcnJheS5pc0FycmF5KHBhcnNlUGF0dGVybnMpID8gZmluZEluZGV4KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pIDogZmluZEtleShwYXJzZVBhdHRlcm5zLCBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKTtcbiAgICB9KTtcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2soa2V5KSA6IGtleTtcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB2YXIgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHJlc3Q6IHJlc3RcbiAgICB9O1xuICB9O1xufVxuZnVuY3Rpb24gZmluZEtleShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHByZWRpY2F0ZShvYmplY3Rba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICBmb3IgKHZhciBrZXkgPSAwOyBrZXkgPCBhcnJheS5sZW5ndGg7IGtleSsrKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKSA6IHBhcnNlUmVzdWx0WzBdO1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59IiwiaW1wb3J0IGJ1aWxkTWF0Y2hGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanNcIjtcbmltcG9ydCBidWlsZE1hdGNoUGF0dGVybkZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanNcIjtcbnZhciBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xudmFyIHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXFxkKy9pO1xudmFyIG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYnxhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oYlxcLj9cXHM/Y1xcLj98YlxcLj9cXHM/Y1xcLj9cXHM/ZVxcLj98YVxcLj9cXHM/ZFxcLj98Y1xcLj9cXHM/ZVxcLj8pL2ksXG4gIHdpZGU6IC9eKGJlZm9yZSBjaHJpc3R8YmVmb3JlIGNvbW1vbiBlcmF8YW5ubyBkb21pbml8Y29tbW9uIGVyYSkvaVxufTtcbnZhciBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmIvaSwgL14oYXxjKS9pXVxufTtcbnZhciBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15xWzEyMzRdL2ksXG4gIHdpZGU6IC9eWzEyMzRdKHRofHN0fG5kfHJkKT8gcXVhcnRlci9pXG59O1xudmFyIHBhcnNlUXVhcnRlclBhdHRlcm5zID0ge1xuICBhbnk6IFsvMS9pLCAvMi9pLCAvMy9pLCAvNC9pXVxufTtcbnZhciBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaVxufTtcbnZhciBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9eai9pLCAvXmYvaSwgL15tL2ksIC9eYS9pLCAvXm0vaSwgL15qL2ksIC9eai9pLCAvXmEvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldLFxuICBhbnk6IFsvXmphL2ksIC9eZi9pLCAvXm1hci9pLCAvXmFwL2ksIC9ebWF5L2ksIC9eanVuL2ksIC9eanVsL2ksIC9eYXUvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldXG59O1xudmFyIG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bc210d2ZdL2ksXG4gIHNob3J0OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgd2lkZTogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2lcbn07XG52YXIgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15zL2ksIC9ebS9pLCAvXnQvaSwgL153L2ksIC9edC9pLCAvXmYvaSwgL15zL2ldLFxuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldXG59O1xudmFyIG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pXG59O1xudmFyIHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaVxuICB9XG59O1xudmFyIG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyOiBidWlsZE1hdGNoUGF0dGVybkZuKHtcbiAgICBtYXRjaFBhdHRlcm46IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgcGFyc2VQYXR0ZXJuOiBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHZhbHVlQ2FsbGJhY2s6IGZ1bmN0aW9uIHZhbHVlQ2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIH1cbiAgfSksXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueScsXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayhpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaE1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ2FueScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBtYXRjaDsiLCJpbXBvcnQgZm9ybWF0RGlzdGFuY2UgZnJvbSBcIi4vX2xpYi9mb3JtYXREaXN0YW5jZS9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdExvbmcgZnJvbSBcIi4vX2xpYi9mb3JtYXRMb25nL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0UmVsYXRpdmUgZnJvbSBcIi4vX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGxvY2FsaXplIGZyb20gXCIuL19saWIvbG9jYWxpemUvaW5kZXguanNcIjtcbmltcG9ydCBtYXRjaCBmcm9tIFwiLi9fbGliL21hdGNoL2luZGV4LmpzXCI7XG4vKipcbiAqIEB0eXBlIHtMb2NhbGV9XG4gKiBAY2F0ZWdvcnkgTG9jYWxlc1xuICogQHN1bW1hcnkgRW5nbGlzaCBsb2NhbGUgKFVuaXRlZCBTdGF0ZXMpLlxuICogQGxhbmd1YWdlIEVuZ2xpc2hcbiAqIEBpc28tNjM5LTIgZW5nXG4gKiBAYXV0aG9yIFNhc2hhIEtvc3MgW0Brb3Nzbm9jb3JwXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20va29zc25vY29ycH1cbiAqIEBhdXRob3IgTGVzaGEgS29zcyBbQGxlc2hha29zc117QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2xlc2hha29zc31cbiAqL1xudmFyIGxvY2FsZSA9IHtcbiAgY29kZTogJ2VuLVVTJyxcbiAgZm9ybWF0RGlzdGFuY2U6IGZvcm1hdERpc3RhbmNlLFxuICBmb3JtYXRMb25nOiBmb3JtYXRMb25nLFxuICBmb3JtYXRSZWxhdGl2ZTogZm9ybWF0UmVsYXRpdmUsXG4gIGxvY2FsaXplOiBsb2NhbGl6ZSxcbiAgbWF0Y2g6IG1hdGNoLFxuICBvcHRpb25zOiB7XG4gICAgd2Vla1N0YXJ0c09uOiAwIC8qIFN1bmRheSAqLyxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDFcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsZTsiLCJpbXBvcnQgaXNWYWxpZCBmcm9tIFwiLi4vaXNWYWxpZC9pbmRleC5qc1wiO1xuaW1wb3J0IHN1Yk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vc3ViTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXR0ZXJzIGZyb20gXCIuLi9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9uZ0Zvcm1hdHRlcnMgZnJvbSBcIi4uL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuLCBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4sIHRocm93UHJvdGVjdGVkRXJyb3IgfSBmcm9tIFwiLi4vX2xpYi9wcm90ZWN0ZWRUb2tlbnMvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qc1wiOyAvLyBUaGlzIFJlZ0V4cCBjb25zaXN0cyBvZiB0aHJlZSBwYXJ0cyBzZXBhcmF0ZWQgYnkgYHxgOlxuLy8gLSBbeVlRcU1Md0lkRGVjaWhIS2ttc11vIG1hdGNoZXMgYW55IGF2YWlsYWJsZSBvcmRpbmFsIG51bWJlciB0b2tlblxuLy8gICAob25lIG9mIHRoZSBjZXJ0YWluIGxldHRlcnMgZm9sbG93ZWQgYnkgYG9gKVxuLy8gLSAoXFx3KVxcMSogbWF0Y2hlcyBhbnkgc2VxdWVuY2VzIG9mIHRoZSBzYW1lIGxldHRlclxuLy8gLSAnJyBtYXRjaGVzIHR3byBxdW90ZSBjaGFyYWN0ZXJzIGluIGEgcm93XG4vLyAtICcoJyd8W14nXSkrKCd8JCkgbWF0Y2hlcyBhbnl0aGluZyBzdXJyb3VuZGVkIGJ5IHR3byBxdW90ZSBjaGFyYWN0ZXJzICgnKSxcbi8vICAgZXhjZXB0IGEgc2luZ2xlIHF1b3RlIHN5bWJvbCwgd2hpY2ggZW5kcyB0aGUgc2VxdWVuY2UuXG4vLyAgIFR3byBxdW90ZSBjaGFyYWN0ZXJzIGRvIG5vdCBlbmQgdGhlIHNlcXVlbmNlLlxuLy8gICBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBzaW5nbGUgcXVvdGVcbi8vICAgdGhlbiB0aGUgc2VxdWVuY2Ugd2lsbCBjb250aW51ZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4vLyAtIC4gbWF0Y2hlcyBhbnkgc2luZ2xlIGNoYXJhY3RlciB1bm1hdGNoZWQgYnkgcHJldmlvdXMgcGFydHMgb2YgdGhlIFJlZ0V4cHNcbnZhciBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG52YXIgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcbnZhciBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG52YXIgZG91YmxlUXVvdGVSZWdFeHAgPSAvJycvZztcbnZhciB1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCA9IC9bYS16QS1aXS87XG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIHRoZSBnaXZlbiBmb3JtYXQuIFRoZSByZXN1bHQgbWF5IHZhcnkgYnkgbG9jYWxlLlxuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhlIGBmb3JtYXRgIHRva2VucyBkaWZmZXIgZnJvbSBNb21lbnQuanMgYW5kIG90aGVyIGxpYnJhcmllcy5cbiAqID4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogVGhlIGNoYXJhY3RlcnMgd3JhcHBlZCBiZXR3ZWVuIHR3byBzaW5nbGUgcXVvdGVzIGNoYXJhY3RlcnMgKCcpIGFyZSBlc2NhcGVkLlxuICogVHdvIHNpbmdsZSBxdW90ZXMgaW4gYSByb3csIHdoZXRoZXIgaW5zaWRlIG9yIG91dHNpZGUgYSBxdW90ZWQgc2VxdWVuY2UsIHJlcHJlc2VudCBhICdyZWFsJyBzaW5nbGUgcXVvdGUuXG4gKiAoc2VlIHRoZSBsYXN0IGV4YW1wbGUpXG4gKlxuICogRm9ybWF0IG9mIHRoZSBzdHJpbmcgaXMgYmFzZWQgb24gVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuICogd2l0aCBhIGZldyBhZGRpdGlvbnMgKHNlZSBub3RlIDcgYmVsb3cgdGhlIHRhYmxlKS5cbiAqXG4gKiBBY2NlcHRlZCBwYXR0ZXJuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBhdHRlcm4gfCBSZXN1bHQgZXhhbXBsZXMgICAgICAgICAgICAgICAgICAgfCBOb3RlcyB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tfFxuICogfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRy4uR0dHICB8IEFELCBCQyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgICAgfCBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHRyAgIHwgQSwgQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBDYWxlbmRhciB5ZWFyICAgICAgICAgICAgICAgICAgIHwgeSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHlvICAgICAgfCA0NHRoLCAxc3QsIDB0aCwgMTd0aCAgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5ICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5eSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgIHwgWSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlvICAgICAgfCA0NHRoLCAxc3QsIDE5MDB0aCwgMjAxN3RoICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZWSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgIHwgUiAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSICAgICAgfCAtNDMsIDAwLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlIgICAgIHwgLTA0MywgMDAwLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUiAgICB8IC0wMDQzLCAwMDAwLCAwMDAxLCAxOTAwLCAyMDE3ICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlJSICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUsNyB8XG4gKiB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICAgfCB1ICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXUgICAgICB8IC00MywgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dSAgICAgfCAtMDQzLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1ICAgIHwgLTAwNDMsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dXUgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgUXVhcnRlciAoZm9ybWF0dGluZykgICAgICAgICAgICB8IFEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUVEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgUXVhcnRlciAoc3RhbmQtYWxvbmUpICAgICAgICAgICB8IHEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcXEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgTW9udGggKGZvcm1hdHRpbmcpICAgICAgICAgICAgICB8IE0gICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU0gICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTU0gICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTW9udGggKHN0YW5kLWFsb25lKSAgICAgICAgICAgICB8IEwgICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTEwgICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTCAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTEwgICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgICB8IHcgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3byAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd3cgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgICB8IEkgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSUkgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgICB8IGQgICAgICAgfCAxLCAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzFzdCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZGQgICAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgICB8IEQgICAgICAgfCAxLCAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzY1dGgsIDM2NnRoICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREQgICAgICB8IDAxLCAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERERCAgICAgfCAwMDEsIDAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBEYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgICAgIHwgRS4uRUVFICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUVFICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICB8IGkgICAgICAgfCAxLCAyLCAzLCAuLi4sIDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgN3RoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWkgICAgICB8IDAxLCAwMiwgLi4uLCAwNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWkgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpaSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCA3ICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgfCBlICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW8gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWUgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZWUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoc3RhbmQtYWxvbmUpIHwgYyAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjYyAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2MgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjYyAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2NjICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICB8IGEuLmFhICAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWEgICAgIHwgYW0sIHBtICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWFhICAgfCBhLCBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgfCBiLi5iYiAgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiICAgICB8IGFtLCBwbSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmIgICAgfCBhLm0uLCBwLm0uLCBub29uLCBtaWRuaWdodCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiYiAgIHwgYSwgcCwgbiwgbWkgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgIHwgQi4uQkJCICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkIgICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCQiAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgIHwgaCAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAxMnRoICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgIHwgSCAgICAgICB8IDAsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhvICAgICAgfCAwdGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICAgIHwgMDAsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgIHwgSyAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAwdGggICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLSyAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgIHwgayAgICAgICB8IDI0LCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtvICAgICAgfCAyNHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrayAgICAgIHwgMjQsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbSAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1vICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcyAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNvICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgIHwgUyAgICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTICAgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1MgICAgIHwgMDAwLCAwMDEsIC4uLiwgOTk5ICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTUyAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvIFopICAgICAgICB8IFggICAgICAgfCAtMDgsICswNTMwLCBaICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWCAgICAgIHwgLTA4MDAsICswNTMwLCBaICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYICAgICB8IC0wODowMCwgKzA1OjMwLCBaICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFggICAgfCAtMDgwMCwgKzA1MzAsIFosICsxMjM0NTYgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYWCAgIHwgLTA4OjAwLCArMDU6MzAsIFosICsxMjozNDo1NiAgICAgIHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgIHwgeCAgICAgICB8IC0wOCwgKzA1MzAsICswMCAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4ICAgICAgfCAtMDgwMCwgKzA1MzAsICswMDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHggICAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eCAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAsICsxMjM0NTYgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHh4ICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwLCArMTI6MzQ6NTYgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICAgfCBPLi4uT09PIHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT09PTyAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIgICAgIHxcbiAqIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pICB8IHouLi56enogfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCA2ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB6enp6ICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiw2ICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgIHwgdCAgICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHR0ICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgfCBUICAgICAgIHwgNTEyOTY5NTIwOTAwICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVFQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgICB8IFAgICAgICAgfCAwNC8yOS8xNDUzICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUCAgICAgIHwgQXByIDI5LCAxNDUzICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQICAgICB8IEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFAgICAgfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICAgfCBwICAgICAgIHwgMTI6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHAgICAgICB8IDEyOjAwOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcCAgICAgfCAxMjowMDowMCBBTSBHTVQrMiAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHBwICAgIHwgMTI6MDA6MDAgQU0gR01UKzAyOjAwICAgICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBDb21iaW5hdGlvbiBvZiBkYXRlIGFuZCB0aW1lICAgIHwgUHAgICAgICB8IDA0LzI5LzE0NTMsIDEyOjAwIEFNICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQcHAgICAgfCBBcHIgMjksIDE0NTMsIDEyOjAwOjAwIEFNICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBwcHAgIHwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUHBwcHB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICB8IDIsNyAgIHxcbiAqIE5vdGVzOlxuICogMS4gXCJGb3JtYXR0aW5nXCIgdW5pdHMgKGUuZy4gZm9ybWF0dGluZyBxdWFydGVyKSBpbiB0aGUgZGVmYXVsdCBlbi1VUyBsb2NhbGVcbiAqICAgIGFyZSB0aGUgc2FtZSBhcyBcInN0YW5kLWFsb25lXCIgdW5pdHMsIGJ1dCBhcmUgZGlmZmVyZW50IGluIHNvbWUgbGFuZ3VhZ2VzLlxuICogICAgXCJGb3JtYXR0aW5nXCIgdW5pdHMgYXJlIGRlY2xpbmVkIGFjY29yZGluZyB0byB0aGUgcnVsZXMgb2YgdGhlIGxhbmd1YWdlXG4gKiAgICBpbiB0aGUgY29udGV4dCBvZiBhIGRhdGUuIFwiU3RhbmQtYWxvbmVcIiB1bml0cyBhcmUgYWx3YXlzIG5vbWluYXRpdmUgc2luZ3VsYXI6XG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBMTExMJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZCdgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBNTU1NJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZHUnYFxuICpcbiAqIDIuIEFueSBzZXF1ZW5jZSBvZiB0aGUgaWRlbnRpY2FsIGxldHRlcnMgaXMgYSBwYXR0ZXJuLCB1bmxlc3MgaXQgaXMgZXNjYXBlZCBieVxuICogICAgdGhlIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIChzZWUgYmVsb3cpLlxuICogICAgSWYgdGhlIHNlcXVlbmNlIGlzIGxvbmdlciB0aGFuIGxpc3RlZCBpbiB0YWJsZSAoZS5nLiBgRUVFRUVFRUVFRUVgKVxuICogICAgdGhlIG91dHB1dCB3aWxsIGJlIHRoZSBzYW1lIGFzIGRlZmF1bHQgcGF0dGVybiBmb3IgdGhpcyB1bml0LCB1c3VhbGx5XG4gKiAgICB0aGUgbG9uZ2VzdCBvbmUgKGluIGNhc2Ugb2YgSVNPIHdlZWtkYXlzLCBgRUVFRWApLiBEZWZhdWx0IHBhdHRlcm5zIGZvciB1bml0c1xuICogICAgYXJlIG1hcmtlZCB3aXRoIFwiMlwiIGluIHRoZSBsYXN0IGNvbHVtbiBvZiB0aGUgdGFibGUuXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU0nKSAvLz0+ICdOb3YnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NJykgLy89PiAnTidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqIDMuIFNvbWUgcGF0dGVybnMgY291bGQgYmUgdW5saW1pdGVkIGxlbmd0aCAoc3VjaCBhcyBgeXl5eXl5eXlgKS5cbiAqICAgIFRoZSBvdXRwdXQgd2lsbCBiZSBwYWRkZWQgd2l0aCB6ZXJvcyB0byBtYXRjaCB0aGUgbGVuZ3RoIG9mIHRoZSBwYXR0ZXJuLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAneXl5eXl5eXknKSAvLz0+ICcwMDAwMjAxNydgXG4gKlxuICogNC4gYFFRUVFRYCBhbmQgYHFxcXFxYCBjb3VsZCBiZSBub3Qgc3RyaWN0bHkgbnVtZXJpY2FsIGluIHNvbWUgbG9jYWxlcy5cbiAqICAgIFRoZXNlIHRva2VucyByZXByZXNlbnQgdGhlIHNob3J0ZXN0IGZvcm0gb2YgdGhlIHF1YXJ0ZXIuXG4gKlxuICogNS4gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIHBhdHRlcm5zIGFyZSBCLkMuIHllYXJzOlxuICpcbiAqICAgIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICogICAgfCBBQyAxIHwgICAxIHwgICAxIHxcbiAqICAgIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gKiAgICB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICpcbiAqICAgIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAqICAgIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZDpcbiAqXG4gKiAgICB8IFllYXIgfCBgeXlgIHwgYHV1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tLXwtLS0tLS18XG4gKiAgICB8IDEgICAgfCAgIDAxIHwgICAwMSB8XG4gKiAgICB8IDE0ICAgfCAgIDE0IHwgICAxNCB8XG4gKiAgICB8IDM3NiAgfCAgIDc2IHwgIDM3NiB8XG4gKiAgICB8IDE0NTMgfCAgIDUzIHwgMTQ1MyB8XG4gKlxuICogICAgVGhlIHNhbWUgZGlmZmVyZW5jZSBpcyB0cnVlIGZvciBsb2NhbCBhbmQgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIChgWWAgYW5kIGBSYCksXG4gKiAgICBleGNlcHQgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhcnMgYXJlIGRlcGVuZGVudCBvbiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gXG4gKiAgICBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAoY29tcGFyZSBbZ2V0SVNPV2Vla1llYXJde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0SVNPV2Vla1llYXJ9XG4gKiAgICBhbmQgW2dldFdlZWtZZWFyXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldFdlZWtZZWFyfSkuXG4gKlxuICogNi4gU3BlY2lmaWMgbm9uLWxvY2F0aW9uIHRpbWV6b25lcyBhcmUgY3VycmVudGx5IHVuYXZhaWxhYmxlIGluIGBkYXRlLWZuc2AsXG4gKiAgICBzbyByaWdodCBub3cgdGhlc2UgdG9rZW5zIGZhbGwgYmFjayB0byBHTVQgdGltZXpvbmVzLlxuICpcbiAqIDcuIFRoZXNlIHBhdHRlcm5zIGFyZSBub3QgaW4gdGhlIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqICAgIC0gYGlgOiBJU08gZGF5IG9mIHdlZWtcbiAqICAgIC0gYElgOiBJU08gd2VlayBvZiB5ZWFyXG4gKiAgICAtIGBSYDogSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqICAgIC0gYHRgOiBzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgVGA6IG1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYG9gOiBvcmRpbmFsIG51bWJlciBtb2RpZmllclxuICogICAgLSBgUGA6IGxvbmcgbG9jYWxpemVkIGRhdGVcbiAqICAgIC0gYHBgOiBsb25nIGxvY2FsaXplZCB0aW1lXG4gKlxuICogOC4gYFlZYCBhbmQgYFlZWVlgIHRva2VucyByZXByZXNlbnQgd2Vlay1udW1iZXJpbmcgeWVhcnMgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggeWVhcnMuXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiA5LiBgRGAgYW5kIGBERGAgdG9rZW5zIHJlcHJlc2VudCBkYXlzIG9mIHRoZSB5ZWFyIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIGRheXMgb2YgdGhlIG1vbnRoLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdCAtIHRoZSBzdHJpbmcgb2YgdG9rZW5zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHBhcmFtIHswfDF8MnwzfDR8NXw2fSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGU9MV0gLSB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2Vucz1mYWxzZV0gLSBpZiB0cnVlLCBhbGxvd3MgdXNhZ2Ugb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIgdG9rZW5zIGBZWWAgYW5kIGBZWVlZYDtcbiAqICAgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM9ZmFsc2VdIC0gaWYgdHJ1ZSwgYWxsb3dzIHVzYWdlIG9mIHRoZSBkYXkgb2YgeWVhciB0b2tlbnMgYERgIGFuZCBgRERgO1xuICogICBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBsb2NhbGl6ZWAgcHJvcGVydHlcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXRMb25nYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMud2Vla1N0YXJ0c09uYCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNlxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgN1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gdXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYHl5YCBpbnN0ZWFkIG9mIGBZWWAgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gdXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYGRkYCBpbnN0ZWFkIG9mIGBERGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gZm9ybWF0IHN0cmluZyBjb250YWlucyBhbiB1bmVzY2FwZWQgbGF0aW4gYWxwaGFiZXQgY2hhcmFjdGVyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDEsIDExKSwgJ01NL2RkL3l5eXknKVxuICogLy89PiAnMDIvMTEvMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDIgSnVseSAyMDE0IGluIEVzcGVyYW50bzpcbiAqIGltcG9ydCB7IGVvTG9jYWxlIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIpLCBcImRvICdkZScgTU1NTSB5eXl5XCIsIHtcbiAqICAgbG9jYWxlOiBlb0xvY2FsZVxuICogfSlcbiAqIC8vPT4gJzItYSBkZSBqdWxpbyAyMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFc2NhcGUgc3RyaW5nIGJ5IHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIsIDE1KSwgXCJoICdvJydjbG9jaydcIilcbiAqIC8vPT4gXCIzIG8nY2xvY2tcIlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChkaXJ0eURhdGUsIGRpcnR5Rm9ybWF0U3RyLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfb3B0aW9ucyRsb2NhbGUsIF9yZWYyLCBfcmVmMywgX3JlZjQsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlMiwgX29wdGlvbnMkbG9jYWxlMiRvcHRpLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIsIF9yZWY1LCBfcmVmNiwgX3JlZjcsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlMywgX29wdGlvbnMkbG9jYWxlMyRvcHRpLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwzLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0O1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGZvcm1hdFN0ciA9IFN0cmluZyhkaXJ0eUZvcm1hdFN0cik7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBsb2NhbGUgPSAoX3JlZiA9IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyRsb2NhbGUgIT09IHZvaWQgMCA/IF9vcHRpb25zJGxvY2FsZSA6IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IGRlZmF1bHRMb2NhbGU7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYyID0gKF9yZWYzID0gKF9yZWY0ID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMiA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUyID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMiRvcHRpID0gX29wdGlvbnMkbG9jYWxlMi5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUyJG9wdGkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZTIkb3B0aS5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWY0ICE9PSB2b2lkIDAgPyBfcmVmNCA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogMSk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAxIGFuZCA3IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEoZmlyc3RXZWVrQ29udGFpbnNEYXRlID49IDEgJiYgZmlyc3RXZWVrQ29udGFpbnNEYXRlIDw9IDcpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2ZpcnN0V2Vla0NvbnRhaW5zRGF0ZSBtdXN0IGJlIGJldHdlZW4gMSBhbmQgNyBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWY1ID0gKF9yZWY2ID0gKF9yZWY3ID0gKF9vcHRpb25zJHdlZWtTdGFydHNPbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9vcHRpb25zJHdlZWtTdGFydHNPbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkd2Vla1N0YXJ0c09uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMyA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUzID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMyRvcHRpID0gX29wdGlvbnMkbG9jYWxlMy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUzJG9wdGkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZTMkb3B0aS53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWY3ICE9PSB2b2lkIDAgPyBfcmVmNyA6IGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjYgIT09IHZvaWQgMCA/IF9yZWY2IDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMgPSBkZWZhdWx0T3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWw0ID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsMy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0LndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjUgIT09IHZvaWQgMCA/IF9yZWY1IDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIGlmICghbG9jYWxlLmxvY2FsaXplKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gbG9jYWxpemUgcHJvcGVydHknKTtcbiAgfVxuICBpZiAoIWxvY2FsZS5mb3JtYXRMb25nKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gZm9ybWF0TG9uZyBwcm9wZXJ0eScpO1xuICB9XG4gIHZhciBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGluIHN5c3RlbSB0aW1lem9uZSB0byB0aGUgc2FtZSBkYXRlIGluIFVUQyswMDowMCB0aW1lem9uZS5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgd2hlbiBVVEMgZnVuY3Rpb25zIHdpbGwgYmUgaW1wbGVtZW50ZWQsIGxvY2FsZXMgd2lsbCBiZSBjb21wYXRpYmxlIHdpdGggdGhlbS5cbiAgLy8gU2VlIGFuIGlzc3VlIGFib3V0IFVUQyBmdW5jdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG4gIHZhciB0aW1lem9uZU9mZnNldCA9IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMob3JpZ2luYWxEYXRlKTtcbiAgdmFyIHV0Y0RhdGUgPSBzdWJNaWxsaXNlY29uZHMob3JpZ2luYWxEYXRlLCB0aW1lem9uZU9mZnNldCk7XG4gIHZhciBmb3JtYXR0ZXJPcHRpb25zID0ge1xuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogZmlyc3RXZWVrQ29udGFpbnNEYXRlLFxuICAgIHdlZWtTdGFydHNPbjogd2Vla1N0YXJ0c09uLFxuICAgIGxvY2FsZTogbG9jYWxlLFxuICAgIF9vcmlnaW5hbERhdGU6IG9yaWdpbmFsRGF0ZVxuICB9O1xuICB2YXIgcmVzdWx0ID0gZm9ybWF0U3RyLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKS5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIHZhciBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09ICdwJyB8fCBmaXJzdENoYXJhY3RlciA9PT0gJ1AnKSB7XG4gICAgICB2YXIgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgIHJldHVybiBsb25nRm9ybWF0dGVyKHN1YnN0cmluZywgbG9jYWxlLmZvcm1hdExvbmcpO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyaW5nO1xuICB9KS5qb2luKCcnKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKS5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIC8vIFJlcGxhY2UgdHdvIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIHdpdGggb25lIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICBpZiAoc3Vic3RyaW5nID09PSBcIicnXCIpIHtcbiAgICAgIHJldHVybiBcIidcIjtcbiAgICB9XG4gICAgdmFyIGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCInXCIpIHtcbiAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zKSAmJiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4oc3Vic3RyaW5nKSkge1xuICAgICAgICB0aHJvd1Byb3RlY3RlZEVycm9yKHN1YnN0cmluZywgZGlydHlGb3JtYXRTdHIsIFN0cmluZyhkaXJ0eURhdGUpKTtcbiAgICAgIH1cbiAgICAgIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucykgJiYgaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbihzdWJzdHJpbmcpKSB7XG4gICAgICAgIHRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBkaXJ0eUZvcm1hdFN0ciwgU3RyaW5nKGRpcnR5RGF0ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZvcm1hdHRlcih1dGNEYXRlLCBzdWJzdHJpbmcsIGxvY2FsZS5sb2NhbGl6ZSwgZm9ybWF0dGVyT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYCcgKyBmaXJzdENoYXJhY3RlciArICdgJyk7XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHJpbmc7XG4gIH0pLmpvaW4oJycpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIHZhciBtYXRjaGVkID0gaW5wdXQubWF0Y2goZXNjYXBlZFN0cmluZ1JlZ0V4cCk7XG4gIGlmICghbWF0Y2hlZCkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59IiwiZXhwb3J0IGNvbnN0IEV4cG9ydGVycyA9IFsnY3N2JywgJ2pzb24nLCAneG1sJ107XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIExvYWRlciwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgZm9ybWF0IGZyb20gJ2RhdGUtZm5zL2Zvcm1hdCc7XG5pbXBvcnQgeyBFeHBvcnRlcnMgfSBmcm9tICcuLi9leHBvcnRlci50eXBlLmpzJztcbmV4cG9ydCBjb25zdCBtaW1lVHlwZXMgPSB7XG4gICAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIGNzdjogJ3RleHQvY3N2JyxcbiAgICB4bWw6ICd0ZXh0L3htbCcsXG59O1xuZXhwb3J0IGNvbnN0IGdldEV4cG9ydGVkRmlsZU5hbWUgPSAoZXh0ZW5zaW9uKSA9PiBgZXhwb3J0LSR7Zm9ybWF0KERhdGUubm93KCksICd5eXl5LU1NLWRkX0hILW1tJyl9LiR7ZXh0ZW5zaW9ufWA7XG5jb25zdCBFeHBvcnRDb21wb25lbnQgPSAoeyByZXNvdXJjZSB9KSA9PiB7XG4gICAgY29uc3QgW2lzRmV0Y2hpbmcsIHNldEZldGNoaW5nXSA9IHVzZVN0YXRlKCk7XG4gICAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICAgIGNvbnN0IGV4cG9ydERhdGEgPSBhc3luYyAodHlwZSkgPT4ge1xuICAgICAgICBzZXRGZXRjaGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBleHBvcnRlZERhdGEgfSwgfSA9IGF3YWl0IG5ldyBBcGlDbGllbnQoKS5yZXNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2V4cG9ydCcsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtleHBvcnRlZERhdGFdLCB7IHR5cGU6IG1pbWVUeXBlc1t0eXBlXSB9KTtcbiAgICAgICAgICAgIHNhdmVBcyhibG9iLCBnZXRFeHBvcnRlZEZpbGVOYW1lKHR5cGUpKTtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiAnRXhwb3J0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogZS5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIGlmIChpc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybiA8TG9hZGVyIC8+O1xuICAgIH1cbiAgICByZXR1cm4gKDxCb3g+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCI+Q2hvb3NlIGV4cG9ydCBmb3JtYXQ6PC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAge0V4cG9ydGVycy5tYXAocGFyc2VyVHlwZSA9PiAoPEJveCBrZXk9e3BhcnNlclR5cGV9IG09ezJ9PlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBleHBvcnREYXRhKHBhcnNlclR5cGUpfSBkaXNhYmxlZD17aXNGZXRjaGluZ30+XG4gICAgICAgICAgICAgIHtwYXJzZXJUeXBlLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD4pKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQm94Pik7XG59O1xuZXhwb3J0IGRlZmF1bHQgRXhwb3J0Q29tcG9uZW50O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQXBwcm92ZU1lbWJlciBmcm9tICcuLi9hcGkvQXBwcm92ZU1lbWJlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQXBwcm92ZU1lbWJlciA9IEFwcHJvdmVNZW1iZXJcbmltcG9ydCBSZWplY3RNZW1iZXIgZnJvbSAnLi4vYXBpL1JlamVjdE1lbWJlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVqZWN0TWVtYmVyID0gUmVqZWN0TWVtYmVyXG5pbXBvcnQgVXBsb2FkRWRpdENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi8uLi9ub2RldmVudi9wdWJsaWNfaHRtbC9zdGZ0L2JhY2tlbmQvMjAvbGliL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkTGlzdENvbXBvbmVudCA9IFVwbG9hZExpc3RDb21wb25lbnRcbmltcG9ydCBVcGxvYWRTaG93Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZFNob3dDb21wb25lbnQgPSBVcGxvYWRTaG93Q29tcG9uZW50XG5pbXBvcnQgSW1wb3J0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGV2ZW52L3B1YmxpY19odG1sL3N0ZnQvYmFja2VuZC8yMC9saWIvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2NvbXBvbmVudHMvSW1wb3J0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbXBvcnRDb21wb25lbnQgPSBJbXBvcnRDb21wb25lbnRcbmltcG9ydCBFeHBvcnRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZXZlbnYvcHVibGljX2h0bWwvc3RmdC9iYWNrZW5kLzIwL2xpYi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9FeHBvcnRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkV4cG9ydENvbXBvbmVudCA9IEV4cG9ydENvbXBvbmVudCJdLCJuYW1lcyI6WyJiaW5kIiwiZm4iLCJ0aGlzQXJnIiwid3JhcCIsImFwcGx5IiwiYXJndW1lbnRzIiwidG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsImtpbmRPZiIsImNhY2hlIiwidGhpbmciLCJzdHIiLCJjYWxsIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsImNyZWF0ZSIsImtpbmRPZlRlc3QiLCJ0eXBlIiwidHlwZU9mVGVzdCIsImlzQXJyYXkiLCJBcnJheSIsImlzVW5kZWZpbmVkIiwiaXNCdWZmZXIiLCJ2YWwiLCJjb25zdHJ1Y3RvciIsImlzRnVuY3Rpb24iLCJpc0FycmF5QnVmZmVyIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJyZXN1bHQiLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsImJ1ZmZlciIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc09iamVjdCIsImlzQm9vbGVhbiIsImlzUGxhaW5PYmplY3QiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIml0ZXJhdG9yIiwiaXNEYXRlIiwiaXNGaWxlIiwiaXNCbG9iIiwiaXNGaWxlTGlzdCIsImlzU3RyZWFtIiwicGlwZSIsImlzRm9ybURhdGEiLCJraW5kIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJpc1VSTFNlYXJjaFBhcmFtcyIsImlzUmVhZGFibGVTdHJlYW0iLCJpc1JlcXVlc3QiLCJpc1Jlc3BvbnNlIiwiaXNIZWFkZXJzIiwibWFwIiwidHJpbSIsInJlcGxhY2UiLCJmb3JFYWNoIiwib2JqIiwiYWxsT3duS2V5cyIsImkiLCJsIiwibGVuZ3RoIiwia2V5cyIsImdldE93blByb3BlcnR5TmFtZXMiLCJsZW4iLCJrZXkiLCJmaW5kS2V5IiwiX2tleSIsIl9nbG9iYWwiLCJnbG9iYWxUaGlzIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImlzQ29udGV4dERlZmluZWQiLCJjb250ZXh0IiwibWVyZ2UiLCJjYXNlbGVzcyIsImFzc2lnblZhbHVlIiwidGFyZ2V0S2V5IiwiZXh0ZW5kIiwiYSIsImIiLCJzdHJpcEJPTSIsImNvbnRlbnQiLCJjaGFyQ29kZUF0IiwiaW5oZXJpdHMiLCJzdXBlckNvbnN0cnVjdG9yIiwicHJvcHMiLCJkZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJhc3NpZ24iLCJ0b0ZsYXRPYmplY3QiLCJzb3VyY2VPYmoiLCJkZXN0T2JqIiwiZmlsdGVyIiwicHJvcEZpbHRlciIsInByb3AiLCJtZXJnZWQiLCJlbmRzV2l0aCIsInNlYXJjaFN0cmluZyIsInBvc2l0aW9uIiwiU3RyaW5nIiwidW5kZWZpbmVkIiwibGFzdEluZGV4IiwiaW5kZXhPZiIsInRvQXJyYXkiLCJhcnIiLCJpc1R5cGVkQXJyYXkiLCJUeXBlZEFycmF5IiwiVWludDhBcnJheSIsImZvckVhY2hFbnRyeSIsImdlbmVyYXRvciIsIm5leHQiLCJkb25lIiwicGFpciIsIm1hdGNoQWxsIiwicmVnRXhwIiwibWF0Y2hlcyIsImV4ZWMiLCJwdXNoIiwiaXNIVE1MRm9ybSIsInRvQ2FtZWxDYXNlIiwicmVwbGFjZXIiLCJtIiwicDEiLCJwMiIsInRvVXBwZXJDYXNlIiwiaGFzT3duUHJvcGVydHkiLCJpc1JlZ0V4cCIsInJlZHVjZURlc2NyaXB0b3JzIiwicmVkdWNlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJyZWR1Y2VkRGVzY3JpcHRvcnMiLCJkZXNjcmlwdG9yIiwibmFtZSIsInJldCIsImRlZmluZVByb3BlcnRpZXMiLCJmcmVlemVNZXRob2RzIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwic2V0IiwiRXJyb3IiLCJ0b09iamVjdFNldCIsImFycmF5T3JTdHJpbmciLCJkZWxpbWl0ZXIiLCJkZWZpbmUiLCJzcGxpdCIsIm5vb3AiLCJ0b0Zpbml0ZU51bWJlciIsImRlZmF1bHRWYWx1ZSIsIk51bWJlciIsImlzRmluaXRlIiwiQUxQSEEiLCJESUdJVCIsIkFMUEhBQkVUIiwiQUxQSEFfRElHSVQiLCJnZW5lcmF0ZVN0cmluZyIsInNpemUiLCJhbHBoYWJldCIsIk1hdGgiLCJyYW5kb20iLCJpc1NwZWNDb21wbGlhbnRGb3JtIiwidG9KU09OT2JqZWN0Iiwic3RhY2siLCJ2aXNpdCIsInNvdXJjZSIsInRhcmdldCIsInJlZHVjZWRWYWx1ZSIsImlzQXN5bmNGbiIsImlzVGhlbmFibGUiLCJ0aGVuIiwiY2F0Y2giLCJoYXNPd25Qcm9wIiwiQXhpb3NFcnJvciIsIm1lc3NhZ2UiLCJjb2RlIiwiY29uZmlnIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJ1dGlscyIsInRvSlNPTiIsImRlc2NyaXB0aW9uIiwibnVtYmVyIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3RhdHVzIiwiZnJvbSIsImVycm9yIiwiY3VzdG9tUHJvcHMiLCJheGlvc0Vycm9yIiwiY2F1c2UiLCJpc1Zpc2l0YWJsZSIsInJlbW92ZUJyYWNrZXRzIiwicmVuZGVyS2V5IiwicGF0aCIsImRvdHMiLCJjb25jYXQiLCJlYWNoIiwidG9rZW4iLCJqb2luIiwiaXNGbGF0QXJyYXkiLCJzb21lIiwicHJlZGljYXRlcyIsInRlc3QiLCJ0b0Zvcm1EYXRhIiwiZm9ybURhdGEiLCJvcHRpb25zIiwiVHlwZUVycm9yIiwibWV0YVRva2VucyIsImluZGV4ZXMiLCJkZWZpbmVkIiwib3B0aW9uIiwidmlzaXRvciIsImRlZmF1bHRWaXNpdG9yIiwiX0Jsb2IiLCJCbG9iIiwidXNlQmxvYiIsImNvbnZlcnRWYWx1ZSIsInRvSVNPU3RyaW5nIiwiQnVmZmVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImVsIiwiaW5kZXgiLCJleHBvc2VkSGVscGVycyIsImJ1aWxkIiwicG9wIiwiZW5jb2RlIiwiY2hhck1hcCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1hdGNoIiwiQXhpb3NVUkxTZWFyY2hQYXJhbXMiLCJwYXJhbXMiLCJfcGFpcnMiLCJlbmNvZGVyIiwiX2VuY29kZSIsImJ1aWxkVVJMIiwidXJsIiwic2VyaWFsaXplRm4iLCJzZXJpYWxpemUiLCJzZXJpYWxpemVkUGFyYW1zIiwiaGFzaG1hcmtJbmRleCIsIkludGVyY2VwdG9yTWFuYWdlciIsImhhbmRsZXJzIiwidXNlIiwiZnVsZmlsbGVkIiwicmVqZWN0ZWQiLCJzeW5jaHJvbm91cyIsInJ1bldoZW4iLCJlamVjdCIsImlkIiwiY2xlYXIiLCJmb3JFYWNoSGFuZGxlciIsImgiLCJzaWxlbnRKU09OUGFyc2luZyIsImZvcmNlZEpTT05QYXJzaW5nIiwiY2xhcmlmeVRpbWVvdXRFcnJvciIsIlVSTFNlYXJjaFBhcmFtcyIsImlzQnJvd3NlciIsImNsYXNzZXMiLCJwcm90b2NvbHMiLCJoYXNCcm93c2VyRW52IiwiZG9jdW1lbnQiLCJoYXNTdGFuZGFyZEJyb3dzZXJFbnYiLCJwcm9kdWN0IiwibmF2aWdhdG9yIiwiaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52IiwiV29ya2VyR2xvYmFsU2NvcGUiLCJpbXBvcnRTY3JpcHRzIiwib3JpZ2luIiwibG9jYXRpb24iLCJocmVmIiwicGxhdGZvcm0iLCJ0b1VSTEVuY29kZWRGb3JtIiwiZGF0YSIsImhlbHBlcnMiLCJpc05vZGUiLCJwYXJzZVByb3BQYXRoIiwiYXJyYXlUb09iamVjdCIsImZvcm1EYXRhVG9KU09OIiwiYnVpbGRQYXRoIiwiaXNOdW1lcmljS2V5IiwiaXNMYXN0IiwiZW50cmllcyIsInN0cmluZ2lmeVNhZmVseSIsInJhd1ZhbHVlIiwicGFyc2VyIiwicGFyc2UiLCJlIiwiZGVmYXVsdHMiLCJ0cmFuc2l0aW9uYWwiLCJ0cmFuc2l0aW9uYWxEZWZhdWx0cyIsImFkYXB0ZXIiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiaGVhZGVycyIsImNvbnRlbnRUeXBlIiwiZ2V0Q29udGVudFR5cGUiLCJoYXNKU09OQ29udGVudFR5cGUiLCJpc09iamVjdFBheWxvYWQiLCJzZXRDb250ZW50VHlwZSIsImZvcm1TZXJpYWxpemVyIiwiX0Zvcm1EYXRhIiwiZW52IiwidHJhbnNmb3JtUmVzcG9uc2UiLCJKU09OUmVxdWVzdGVkIiwicmVzcG9uc2VUeXBlIiwic3RyaWN0SlNPTlBhcnNpbmciLCJFUlJfQkFEX1JFU1BPTlNFIiwidGltZW91dCIsInhzcmZDb29raWVOYW1lIiwieHNyZkhlYWRlck5hbWUiLCJtYXhDb250ZW50TGVuZ3RoIiwibWF4Qm9keUxlbmd0aCIsInZhbGlkYXRlU3RhdHVzIiwiY29tbW9uIiwibWV0aG9kIiwiaWdub3JlRHVwbGljYXRlT2YiLCJyYXdIZWFkZXJzIiwicGFyc2VkIiwibGluZSIsInN1YnN0cmluZyIsIiRpbnRlcm5hbHMiLCJub3JtYWxpemVIZWFkZXIiLCJoZWFkZXIiLCJub3JtYWxpemVWYWx1ZSIsInBhcnNlVG9rZW5zIiwidG9rZW5zIiwidG9rZW5zUkUiLCJpc1ZhbGlkSGVhZGVyTmFtZSIsIm1hdGNoSGVhZGVyVmFsdWUiLCJpc0hlYWRlck5hbWVGaWx0ZXIiLCJmb3JtYXRIZWFkZXIiLCJ3IiwiY2hhciIsImJ1aWxkQWNjZXNzb3JzIiwiYWNjZXNzb3JOYW1lIiwibWV0aG9kTmFtZSIsImFyZzEiLCJhcmcyIiwiYXJnMyIsImNvbmZpZ3VyYWJsZSIsIkF4aW9zSGVhZGVycyIsInZhbHVlT3JSZXdyaXRlIiwicmV3cml0ZSIsInNldEhlYWRlciIsIl92YWx1ZSIsIl9oZWFkZXIiLCJfcmV3cml0ZSIsImxIZWFkZXIiLCJzZXRIZWFkZXJzIiwicGFyc2VIZWFkZXJzIiwiZ2V0IiwiaGFzIiwibWF0Y2hlciIsImRlbGV0ZSIsImRlbGV0ZWQiLCJkZWxldGVIZWFkZXIiLCJub3JtYWxpemUiLCJmb3JtYXQiLCJub3JtYWxpemVkIiwidGFyZ2V0cyIsImFzU3RyaW5ncyIsImZpcnN0IiwiY29tcHV0ZWQiLCJhY2Nlc3NvciIsImludGVybmFscyIsImFjY2Vzc29ycyIsImRlZmluZUFjY2Vzc29yIiwibWFwcGVkIiwiaGVhZGVyVmFsdWUiLCJ0cmFuc2Zvcm1EYXRhIiwiZm5zIiwidHJhbnNmb3JtIiwiaXNDYW5jZWwiLCJfX0NBTkNFTF9fIiwiQ2FuY2VsZWRFcnJvciIsIkVSUl9DQU5DRUxFRCIsInNldHRsZSIsInJlc29sdmUiLCJyZWplY3QiLCJFUlJfQkFEX1JFUVVFU1QiLCJmbG9vciIsInBhcnNlUHJvdG9jb2wiLCJzcGVlZG9tZXRlciIsInNhbXBsZXNDb3VudCIsIm1pbiIsImJ5dGVzIiwidGltZXN0YW1wcyIsImhlYWQiLCJ0YWlsIiwiZmlyc3RTYW1wbGVUUyIsImNodW5rTGVuZ3RoIiwibm93IiwiRGF0ZSIsInN0YXJ0ZWRBdCIsImJ5dGVzQ291bnQiLCJwYXNzZWQiLCJyb3VuZCIsInRocm90dGxlIiwiZnJlcSIsInRpbWVzdGFtcCIsInRocmVzaG9sZCIsInRpbWVyIiwidGhyb3R0bGVkIiwiZm9yY2UiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwibGlzdGVuZXIiLCJpc0Rvd25sb2FkU3RyZWFtIiwiYnl0ZXNOb3RpZmllZCIsIl9zcGVlZG9tZXRlciIsImxvYWRlZCIsInRvdGFsIiwibGVuZ3RoQ29tcHV0YWJsZSIsInByb2dyZXNzQnl0ZXMiLCJyYXRlIiwiaW5SYW5nZSIsInByb2dyZXNzIiwiZXN0aW1hdGVkIiwiZXZlbnQiLCJzdGFuZGFyZEJyb3dzZXJFbnYiLCJtc2llIiwidXNlckFnZW50IiwidXJsUGFyc2luZ05vZGUiLCJjcmVhdGVFbGVtZW50Iiwib3JpZ2luVVJMIiwicmVzb2x2ZVVSTCIsInNldEF0dHJpYnV0ZSIsInByb3RvY29sIiwiaG9zdCIsInNlYXJjaCIsImhhc2giLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsImNoYXJBdCIsImlzVVJMU2FtZU9yaWdpbiIsInJlcXVlc3RVUkwiLCJub25TdGFuZGFyZEJyb3dzZXJFbnYiLCJ3cml0ZSIsImV4cGlyZXMiLCJkb21haW4iLCJzZWN1cmUiLCJjb29raWUiLCJ0b0dNVFN0cmluZyIsInJlYWQiLCJSZWdFeHAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZW1vdmUiLCJpc0Fic29sdXRlVVJMIiwiY29tYmluZVVSTHMiLCJiYXNlVVJMIiwicmVsYXRpdmVVUkwiLCJidWlsZEZ1bGxQYXRoIiwicmVxdWVzdGVkVVJMIiwiaGVhZGVyc1RvT2JqZWN0IiwibWVyZ2VDb25maWciLCJjb25maWcxIiwiY29uZmlnMiIsImdldE1lcmdlZFZhbHVlIiwibWVyZ2VEZWVwUHJvcGVydGllcyIsInZhbHVlRnJvbUNvbmZpZzIiLCJkZWZhdWx0VG9Db25maWcyIiwibWVyZ2VEaXJlY3RLZXlzIiwibWVyZ2VNYXAiLCJwYXJhbXNTZXJpYWxpemVyIiwidGltZW91dE1lc3NhZ2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ3aXRoWFNSRlRva2VuIiwib25VcGxvYWRQcm9ncmVzcyIsIm9uRG93bmxvYWRQcm9ncmVzcyIsImRlY29tcHJlc3MiLCJiZWZvcmVSZWRpcmVjdCIsInRyYW5zcG9ydCIsImh0dHBBZ2VudCIsImh0dHBzQWdlbnQiLCJjYW5jZWxUb2tlbiIsInNvY2tldFBhdGgiLCJyZXNwb25zZUVuY29kaW5nIiwiY29tcHV0ZUNvbmZpZ1ZhbHVlIiwiY29uZmlnVmFsdWUiLCJuZXdDb25maWciLCJhdXRoIiwiYnRvYSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ1bmVzY2FwZSIsIkJvb2xlYW4iLCJ4c3JmVmFsdWUiLCJjb29raWVzIiwiaXNYSFJBZGFwdGVyU3VwcG9ydGVkIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwiZGlzcGF0Y2hYaHJSZXF1ZXN0IiwiX2NvbmZpZyIsInJlc29sdmVDb25maWciLCJyZXF1ZXN0RGF0YSIsInJlcXVlc3RIZWFkZXJzIiwib25DYW5jZWxlZCIsInVuc3Vic2NyaWJlIiwic2lnbmFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9wZW4iLCJvbmxvYWRlbmQiLCJyZXNwb25zZUhlYWRlcnMiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJyZXNwb25zZURhdGEiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwiZXJyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiaGFuZGxlTG9hZCIsInJlYWR5U3RhdGUiLCJyZXNwb25zZVVSTCIsIm9uYWJvcnQiLCJoYW5kbGVBYm9ydCIsIkVDT05OQUJPUlRFRCIsIm9uZXJyb3IiLCJoYW5kbGVFcnJvciIsIkVSUl9ORVRXT1JLIiwib250aW1lb3V0IiwiaGFuZGxlVGltZW91dCIsInRpbWVvdXRFcnJvck1lc3NhZ2UiLCJFVElNRURPVVQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInByb2dyZXNzRXZlbnRSZWR1Y2VyIiwidXBsb2FkIiwiY2FuY2VsIiwiYWJvcnQiLCJzdWJzY3JpYmUiLCJhYm9ydGVkIiwic2VuZCIsImNvbXBvc2VTaWduYWxzIiwic2lnbmFscyIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJyZWFzb24iLCJzdHJlYW1DaHVuayIsImNodW5rIiwiY2h1bmtTaXplIiwiYnl0ZUxlbmd0aCIsInBvcyIsImVuZCIsInJlYWRCeXRlcyIsIml0ZXJhYmxlIiwidHJhY2tTdHJlYW0iLCJzdHJlYW0iLCJvblByb2dyZXNzIiwib25GaW5pc2giLCJSZWFkYWJsZVN0cmVhbSIsInB1bGwiLCJjbG9zZSIsImVucXVldWUiLCJyZXR1cm4iLCJoaWdoV2F0ZXJNYXJrIiwiZmV0Y2hQcm9ncmVzc0RlY29yYXRvciIsImlzRmV0Y2hTdXBwb3J0ZWQiLCJmZXRjaCIsIlJlcXVlc3QiLCJSZXNwb25zZSIsImlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQiLCJlbmNvZGVUZXh0IiwiVGV4dEVuY29kZXIiLCJhcnJheUJ1ZmZlciIsInN1cHBvcnRzUmVxdWVzdFN0cmVhbSIsImR1cGxleEFjY2Vzc2VkIiwiaGFzQ29udGVudFR5cGUiLCJib2R5IiwiZHVwbGV4IiwiREVGQVVMVF9DSFVOS19TSVpFIiwic3VwcG9ydHNSZXNwb25zZVN0cmVhbSIsInJlc29sdmVycyIsInJlcyIsIl8iLCJFUlJfTk9UX1NVUFBPUlQiLCJnZXRCb2R5TGVuZ3RoIiwicmVzb2x2ZUJvZHlMZW5ndGgiLCJnZXRDb250ZW50TGVuZ3RoIiwiZmV0Y2hPcHRpb25zIiwiY29tcG9zZWRTaWduYWwiLCJzdG9wVGltZW91dCIsImZpbmlzaGVkIiwicmVxdWVzdENvbnRlbnRMZW5ndGgiLCJfcmVxdWVzdCIsImNvbnRlbnRUeXBlSGVhZGVyIiwiaXNTdHJlYW1SZXNwb25zZSIsInJlc3BvbnNlQ29udGVudExlbmd0aCIsImtub3duQWRhcHRlcnMiLCJodHRwIiwiaHR0cEFkYXB0ZXIiLCJ4aHIiLCJ4aHJBZGFwdGVyIiwiZmV0Y2hBZGFwdGVyIiwicmVuZGVyUmVhc29uIiwiaXNSZXNvbHZlZEhhbmRsZSIsImdldEFkYXB0ZXIiLCJhZGFwdGVycyIsIm5hbWVPckFkYXB0ZXIiLCJyZWplY3RlZFJlYXNvbnMiLCJyZWFzb25zIiwic3RhdGUiLCJzIiwidGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZCIsInRocm93SWZSZXF1ZXN0ZWQiLCJkaXNwYXRjaFJlcXVlc3QiLCJvbkFkYXB0ZXJSZXNvbHV0aW9uIiwib25BZGFwdGVyUmVqZWN0aW9uIiwiVkVSU0lPTiIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0b3IiLCJkZXByZWNhdGVkV2FybmluZ3MiLCJ2ZXJzaW9uIiwiZm9ybWF0TWVzc2FnZSIsIm9wdCIsImRlc2MiLCJvcHRzIiwiRVJSX0RFUFJFQ0FURUQiLCJjb25zb2xlIiwid2FybiIsImFzc2VydE9wdGlvbnMiLCJzY2hlbWEiLCJhbGxvd1Vua25vd24iLCJFUlJfQkFEX09QVElPTl9WQUxVRSIsIkVSUl9CQURfT1BUSU9OIiwiQXhpb3MiLCJpbnN0YW5jZUNvbmZpZyIsImludGVyY2VwdG9ycyIsImNvbmZpZ09yVXJsIiwiZHVtbXkiLCJib29sZWFuIiwiZnVuY3Rpb24iLCJjb250ZXh0SGVhZGVycyIsInJlcXVlc3RJbnRlcmNlcHRvckNoYWluIiwic3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzIiwidW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMiLCJpbnRlcmNlcHRvciIsInVuc2hpZnQiLCJyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4iLCJwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJwcm9taXNlIiwiY2hhaW4iLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJnZXRVcmkiLCJmdWxsUGF0aCIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJmb3JFYWNoTWV0aG9kV2l0aERhdGEiLCJnZW5lcmF0ZUhUVFBNZXRob2QiLCJpc0Zvcm0iLCJodHRwTWV0aG9kIiwiQ2FuY2VsVG9rZW4iLCJleGVjdXRvciIsInJlc29sdmVQcm9taXNlIiwicHJvbWlzZUV4ZWN1dG9yIiwiX2xpc3RlbmVycyIsIm9uZnVsZmlsbGVkIiwic3BsaWNlIiwiYyIsInNwcmVhZCIsImNhbGxiYWNrIiwiaXNBeGlvc0Vycm9yIiwicGF5bG9hZCIsIkh0dHBTdGF0dXNDb2RlIiwiQ29udGludWUiLCJTd2l0Y2hpbmdQcm90b2NvbHMiLCJQcm9jZXNzaW5nIiwiRWFybHlIaW50cyIsIk9rIiwiQ3JlYXRlZCIsIkFjY2VwdGVkIiwiTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uIiwiTm9Db250ZW50IiwiUmVzZXRDb250ZW50IiwiUGFydGlhbENvbnRlbnQiLCJNdWx0aVN0YXR1cyIsIkFscmVhZHlSZXBvcnRlZCIsIkltVXNlZCIsIk11bHRpcGxlQ2hvaWNlcyIsIk1vdmVkUGVybWFuZW50bHkiLCJGb3VuZCIsIlNlZU90aGVyIiwiTm90TW9kaWZpZWQiLCJVc2VQcm94eSIsIlVudXNlZCIsIlRlbXBvcmFyeVJlZGlyZWN0IiwiUGVybWFuZW50UmVkaXJlY3QiLCJCYWRSZXF1ZXN0IiwiVW5hdXRob3JpemVkIiwiUGF5bWVudFJlcXVpcmVkIiwiRm9yYmlkZGVuIiwiTm90Rm91bmQiLCJNZXRob2ROb3RBbGxvd2VkIiwiTm90QWNjZXB0YWJsZSIsIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZCIsIlJlcXVlc3RUaW1lb3V0IiwiQ29uZmxpY3QiLCJHb25lIiwiTGVuZ3RoUmVxdWlyZWQiLCJQcmVjb25kaXRpb25GYWlsZWQiLCJQYXlsb2FkVG9vTGFyZ2UiLCJVcmlUb29Mb25nIiwiVW5zdXBwb3J0ZWRNZWRpYVR5cGUiLCJSYW5nZU5vdFNhdGlzZmlhYmxlIiwiRXhwZWN0YXRpb25GYWlsZWQiLCJJbUFUZWFwb3QiLCJNaXNkaXJlY3RlZFJlcXVlc3QiLCJVbnByb2Nlc3NhYmxlRW50aXR5IiwiTG9ja2VkIiwiRmFpbGVkRGVwZW5kZW5jeSIsIlRvb0Vhcmx5IiwiVXBncmFkZVJlcXVpcmVkIiwiUHJlY29uZGl0aW9uUmVxdWlyZWQiLCJUb29NYW55UmVxdWVzdHMiLCJSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2UiLCJVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29ucyIsIkludGVybmFsU2VydmVyRXJyb3IiLCJOb3RJbXBsZW1lbnRlZCIsIkJhZEdhdGV3YXkiLCJTZXJ2aWNlVW5hdmFpbGFibGUiLCJHYXRld2F5VGltZW91dCIsIkh0dHBWZXJzaW9uTm90U3VwcG9ydGVkIiwiVmFyaWFudEFsc29OZWdvdGlhdGVzIiwiSW5zdWZmaWNpZW50U3RvcmFnZSIsIkxvb3BEZXRlY3RlZCIsIk5vdEV4dGVuZGVkIiwiTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQiLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRDb25maWciLCJpbnN0YW5jZSIsImF4aW9zIiwiQ2FuY2VsIiwiYWxsIiwicHJvbWlzZXMiLCJmb3JtVG9KU09OIiwiZGVmYXVsdCIsIkFwcHJvdmVNZW1iZXIiLCJhcGlfdXJsIiwicmVjb3JkIiwicmVzb3VyY2UiLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsInB1dCIsIl9pZCIsImFsZXJ0IiwiaGFuZGxlQXBwcm92ZSIsInBvc3QiLCJyZWRpcmVjdFVybCIsIlJlYWN0IiwiQm94IiwidmFyaWFudCIsIndpZHRoIiwicCIsIm10IiwiaXNOZXciLCJvblN1Ym1pdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiaHRtbEZvciIsIklucHV0IiwicGxhY2Vob2xkZXIiLCJyZXF1aXJlZCIsImFjY2VwdCIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJSZWplY3RNZW1iZXIiLCJUZXh0QXJlYSIsIkVkaXQiLCJwcm9wZXJ0eSIsIm9uQ2hhbmdlIiwidHJhbnNsYXRlUHJvcGVydHkiLCJ1c2VUcmFuc2xhdGlvbiIsImN1c3RvbSIsImZsYXQiLCJmaWxlUGF0aFByb3BlcnR5Iiwia2V5UHJvcGVydHkiLCJmaWxlIiwiZmlsZVByb3BlcnR5Iiwib3JpZ2luYWxLZXkiLCJzZXRPcmlnaW5hbEtleSIsInVzZVN0YXRlIiwiZmlsZXNUb1VwbG9hZCIsInNldEZpbGVzVG9VcGxvYWQiLCJ1c2VFZmZlY3QiLCJvblVwbG9hZCIsImZpbGVzIiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJmaWxlc1RvRGVsZXRlIiwiZmlsZXNUb0RlbGV0ZVByb3BlcnR5IiwibmV3UGF0aCIsImN1cnJlbnRQYXRoIiwibmV3UGFyYW1zIiwibG9nIiwibGFiZWwiLCJyZXNvdXJjZUlkIiwiRHJvcFpvbmUiLCJtdWx0aXBsZSIsInZhbGlkYXRlIiwibWltZVR5cGVzIiwibWF4U2l6ZSIsIkRyb3Bab25lSXRlbSIsImZpbGVuYW1lIiwic3JjIiwib25SZW1vdmUiLCJGcmFnbWVudCIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwibWltZVR5cGUiLCJpbmNsdWRlcyIsInN0eWxlIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJhbHQiLCJjb250cm9scyIsImFzIiwibWwiLCJyb3VuZGVkIiwiSWNvbiIsImljb24iLCJjb2xvciIsIm1yIiwiRmlsZSIsImZpbGVOYW1lUHJvcGVydHkiLCJtaW1lVHlwZVByb3BlcnR5IiwiYmFzZVVybCIsInNpbmdsZVBhdGgiLCJMaXN0IiwiU2hvdyIsIkltcG9ydENvbXBvbmVudCIsInNldEZpbGUiLCJzZW5kTm90aWNlIiwidXNlTm90aWNlIiwiaXNGZXRjaGluZyIsInNldEZldGNoaW5nIiwidXBsb2FkZWRGaWxlIiwiaW1wb3J0RGF0YSIsIkFwaUNsaWVudCIsInJlc291cmNlQWN0aW9uIiwiYWN0aW9uTmFtZSIsIkxvYWRlciIsIm1hcmdpbiIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhEaXJlY3Rpb24iLCJkaXNhYmxlZCIsIl90eXBlb2YiLCJvIiwicmVxdWlyZWRBcmdzIiwiYXJncyIsInRvRGF0ZSIsImFyZ3VtZW50IiwiYXJnU3RyIiwiZ2V0VGltZSIsIk5hTiIsImlzVmFsaWQiLCJkaXJ0eURhdGUiLCJkYXRlIiwiaXNOYU4iLCJ0b0ludGVnZXIiLCJkaXJ0eU51bWJlciIsImNlaWwiLCJhZGRNaWxsaXNlY29uZHMiLCJkaXJ0eUFtb3VudCIsImFtb3VudCIsInN1Yk1pbGxpc2Vjb25kcyIsIk1JTExJU0VDT05EU19JTl9EQVkiLCJnZXRVVENEYXlPZlllYXIiLCJzZXRVVENNb250aCIsInNldFVUQ0hvdXJzIiwic3RhcnRPZlllYXJUaW1lc3RhbXAiLCJkaWZmZXJlbmNlIiwic3RhcnRPZlVUQ0lTT1dlZWsiLCJ3ZWVrU3RhcnRzT24iLCJkYXkiLCJnZXRVVENEYXkiLCJkaWZmIiwic2V0VVRDRGF0ZSIsImdldFVUQ0RhdGUiLCJnZXRVVENJU09XZWVrWWVhciIsInllYXIiLCJnZXRVVENGdWxsWWVhciIsImZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIiLCJzZXRVVENGdWxsWWVhciIsInN0YXJ0T2ZOZXh0WWVhciIsImZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIiLCJzdGFydE9mVGhpc1llYXIiLCJzdGFydE9mVVRDSVNPV2Vla1llYXIiLCJmb3VydGhPZkphbnVhcnkiLCJNSUxMSVNFQ09ORFNfSU5fV0VFSyIsImdldFVUQ0lTT1dlZWsiLCJkZWZhdWx0T3B0aW9ucyIsImdldERlZmF1bHRPcHRpb25zIiwic3RhcnRPZlVUQ1dlZWsiLCJfcmVmIiwiX3JlZjIiLCJfcmVmMyIsIl9vcHRpb25zJHdlZWtTdGFydHNPbiIsIl9vcHRpb25zJGxvY2FsZSIsIl9vcHRpb25zJGxvY2FsZSRvcHRpbyIsIl9kZWZhdWx0T3B0aW9ucyRsb2NhbCIsIl9kZWZhdWx0T3B0aW9ucyRsb2NhbDIiLCJsb2NhbGUiLCJSYW5nZUVycm9yIiwiZ2V0VVRDV2Vla1llYXIiLCJfb3B0aW9ucyRmaXJzdFdlZWtDb24iLCJmaXJzdFdlZWtDb250YWluc0RhdGUiLCJmaXJzdFdlZWtPZk5leHRZZWFyIiwiZmlyc3RXZWVrT2ZUaGlzWWVhciIsInN0YXJ0T2ZVVENXZWVrWWVhciIsImZpcnN0V2VlayIsImdldFVUQ1dlZWsiLCJhZGRMZWFkaW5nWmVyb3MiLCJ0YXJnZXRMZW5ndGgiLCJzaWduIiwib3V0cHV0IiwiYWJzIiwiZm9ybWF0dGVycyIsInkiLCJzaWduZWRZZWFyIiwiTSIsIm1vbnRoIiwiZ2V0VVRDTW9udGgiLCJkIiwiZGF5UGVyaW9kRW51bVZhbHVlIiwiZ2V0VVRDSG91cnMiLCJIIiwiZ2V0VVRDTWludXRlcyIsImdldFVUQ1NlY29uZHMiLCJTIiwibnVtYmVyT2ZEaWdpdHMiLCJtaWxsaXNlY29uZHMiLCJnZXRVVENNaWxsaXNlY29uZHMiLCJmcmFjdGlvbmFsU2Vjb25kcyIsInBvdyIsImRheVBlcmlvZEVudW0iLCJhbSIsInBtIiwibWlkbmlnaHQiLCJub29uIiwibW9ybmluZyIsImFmdGVybm9vbiIsImV2ZW5pbmciLCJuaWdodCIsIkciLCJsb2NhbGl6ZSIsImVyYSIsIm9yZGluYWxOdW1iZXIiLCJ1bml0IiwibGlnaHRGb3JtYXR0ZXJzIiwiWSIsInNpZ25lZFdlZWtZZWFyIiwid2Vla1llYXIiLCJ0d29EaWdpdFllYXIiLCJSIiwiaXNvV2Vla1llYXIiLCJ1IiwiUSIsInF1YXJ0ZXIiLCJxIiwiTCIsIndlZWsiLCJJIiwiaXNvV2VlayIsIkQiLCJkYXlPZlllYXIiLCJFIiwiZGF5T2ZXZWVrIiwibG9jYWxEYXlPZldlZWsiLCJpc29EYXlPZldlZWsiLCJob3VycyIsImRheVBlcmlvZCIsIkIiLCJLIiwiayIsIlgiLCJfbG9jYWxpemUiLCJvcmlnaW5hbERhdGUiLCJfb3JpZ2luYWxEYXRlIiwidGltZXpvbmVPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyIsImZvcm1hdFRpbWV6b25lIiwieCIsIk8iLCJmb3JtYXRUaW1lem9uZVNob3J0IiwieiIsInQiLCJUIiwib2Zmc2V0IiwiZGlydHlEZWxpbWl0ZXIiLCJhYnNPZmZzZXQiLCJtaW51dGVzIiwiZGF0ZUxvbmdGb3JtYXR0ZXIiLCJwYXR0ZXJuIiwiZm9ybWF0TG9uZyIsInRpbWVMb25nRm9ybWF0dGVyIiwidGltZSIsImRhdGVUaW1lTG9uZ0Zvcm1hdHRlciIsIm1hdGNoUmVzdWx0IiwiZGF0ZVBhdHRlcm4iLCJ0aW1lUGF0dGVybiIsImRhdGVUaW1lRm9ybWF0IiwiZGF0ZVRpbWUiLCJsb25nRm9ybWF0dGVycyIsIlAiLCJnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIiwidXRjRGF0ZSIsIlVUQyIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsInByb3RlY3RlZERheU9mWWVhclRva2VucyIsInByb3RlY3RlZFdlZWtZZWFyVG9rZW5zIiwiaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbiIsImlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbiIsInRocm93UHJvdGVjdGVkRXJyb3IiLCJpbnB1dCIsImZvcm1hdERpc3RhbmNlTG9jYWxlIiwibGVzc1RoYW5YU2Vjb25kcyIsIm9uZSIsIm90aGVyIiwieFNlY29uZHMiLCJoYWxmQU1pbnV0ZSIsImxlc3NUaGFuWE1pbnV0ZXMiLCJ4TWludXRlcyIsImFib3V0WEhvdXJzIiwieEhvdXJzIiwieERheXMiLCJhYm91dFhXZWVrcyIsInhXZWVrcyIsImFib3V0WE1vbnRocyIsInhNb250aHMiLCJhYm91dFhZZWFycyIsInhZZWFycyIsIm92ZXJYWWVhcnMiLCJhbG1vc3RYWWVhcnMiLCJmb3JtYXREaXN0YW5jZSIsImNvdW50IiwidG9rZW5WYWx1ZSIsImFkZFN1ZmZpeCIsImNvbXBhcmlzb24iLCJidWlsZEZvcm1hdExvbmdGbiIsImRlZmF1bHRXaWR0aCIsImZvcm1hdHMiLCJkYXRlRm9ybWF0cyIsImZ1bGwiLCJsb25nIiwibWVkaXVtIiwic2hvcnQiLCJ0aW1lRm9ybWF0cyIsImRhdGVUaW1lRm9ybWF0cyIsImZvcm1hdFJlbGF0aXZlTG9jYWxlIiwibGFzdFdlZWsiLCJ5ZXN0ZXJkYXkiLCJ0b2RheSIsInRvbW9ycm93IiwibmV4dFdlZWsiLCJmb3JtYXRSZWxhdGl2ZSIsIl9kYXRlIiwiX2Jhc2VEYXRlIiwiX29wdGlvbnMiLCJidWlsZExvY2FsaXplRm4iLCJkaXJ0eUluZGV4IiwidmFsdWVzQXJyYXkiLCJmb3JtYXR0aW5nVmFsdWVzIiwiZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCIsIl9kZWZhdWx0V2lkdGgiLCJfd2lkdGgiLCJ2YWx1ZXMiLCJhcmd1bWVudENhbGxiYWNrIiwiZXJhVmFsdWVzIiwibmFycm93IiwiYWJicmV2aWF0ZWQiLCJ3aWRlIiwicXVhcnRlclZhbHVlcyIsIm1vbnRoVmFsdWVzIiwiZGF5VmFsdWVzIiwiZGF5UGVyaW9kVmFsdWVzIiwiZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyIsInJlbTEwMCIsImJ1aWxkTWF0Y2hGbiIsInN0cmluZyIsIm1hdGNoUGF0dGVybiIsIm1hdGNoUGF0dGVybnMiLCJkZWZhdWx0TWF0Y2hXaWR0aCIsIm1hdGNoZWRTdHJpbmciLCJwYXJzZVBhdHRlcm5zIiwiZGVmYXVsdFBhcnNlV2lkdGgiLCJmaW5kSW5kZXgiLCJ2YWx1ZUNhbGxiYWNrIiwicmVzdCIsIm9iamVjdCIsInByZWRpY2F0ZSIsImFycmF5IiwiYnVpbGRNYXRjaFBhdHRlcm5GbiIsInBhcnNlUmVzdWx0IiwicGFyc2VQYXR0ZXJuIiwibWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiIsInBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4iLCJtYXRjaEVyYVBhdHRlcm5zIiwicGFyc2VFcmFQYXR0ZXJucyIsImFueSIsIm1hdGNoUXVhcnRlclBhdHRlcm5zIiwicGFyc2VRdWFydGVyUGF0dGVybnMiLCJtYXRjaE1vbnRoUGF0dGVybnMiLCJwYXJzZU1vbnRoUGF0dGVybnMiLCJtYXRjaERheVBhdHRlcm5zIiwicGFyc2VEYXlQYXR0ZXJucyIsIm1hdGNoRGF5UGVyaW9kUGF0dGVybnMiLCJwYXJzZURheVBlcmlvZFBhdHRlcm5zIiwicGFyc2VJbnQiLCJmb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJlc2NhcGVkU3RyaW5nUmVnRXhwIiwiZG91YmxlUXVvdGVSZWdFeHAiLCJ1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCIsImRpcnR5Rm9ybWF0U3RyIiwiX3JlZjQiLCJfcmVmNSIsIl9yZWY2IiwiX3JlZjciLCJfZGVmYXVsdE9wdGlvbnMkbG9jYWwzIiwiX2RlZmF1bHRPcHRpb25zJGxvY2FsNCIsImZvcm1hdFN0ciIsImRlZmF1bHRMb2NhbGUiLCJmb3JtYXR0ZXJPcHRpb25zIiwiZmlyc3RDaGFyYWN0ZXIiLCJsb25nRm9ybWF0dGVyIiwiY2xlYW5Fc2NhcGVkU3RyaW5nIiwiZm9ybWF0dGVyIiwibWF0Y2hlZCIsIkV4cG9ydGVycyIsImpzb24iLCJjc3YiLCJ4bWwiLCJnZXRFeHBvcnRlZEZpbGVOYW1lIiwiZXh0ZW5zaW9uIiwiRXhwb3J0Q29tcG9uZW50IiwiZXhwb3J0RGF0YSIsImV4cG9ydGVkRGF0YSIsImJsb2IiLCJzYXZlQXMiLCJUZXh0IiwicGFyc2VyVHlwZSIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIlVwbG9hZEVkaXRDb21wb25lbnQiLCJVcGxvYWRMaXN0Q29tcG9uZW50IiwiVXBsb2FkU2hvd0NvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUVlLFNBQVNBLElBQUlBLENBQUNDLEVBQUUsRUFBRUMsT0FBTyxFQUFFO0lBQ3hDLE9BQU8sU0FBU0MsSUFBSUEsR0FBRztFQUNyQixJQUFBLE9BQU9GLEVBQUUsQ0FBQ0csS0FBSyxDQUFDRixPQUFPLEVBQUVHLFNBQVMsQ0FBQyxDQUFBO0tBQ3BDLENBQUE7RUFDSDs7RUNGQTs7RUFFQSxNQUFNO0VBQUNDLEVBQUFBLFFBQUFBO0VBQVEsQ0FBQyxHQUFHQyxNQUFNLENBQUNDLFNBQVMsQ0FBQTtFQUNuQyxNQUFNO0VBQUNDLEVBQUFBLGNBQUFBO0VBQWMsQ0FBQyxHQUFHRixNQUFNLENBQUE7RUFFL0IsTUFBTUcsTUFBTSxHQUFHLENBQUNDLEtBQUssSUFBSUMsS0FBSyxJQUFJO0VBQzlCLEVBQUEsTUFBTUMsR0FBRyxHQUFHUCxRQUFRLENBQUNRLElBQUksQ0FBQ0YsS0FBSyxDQUFDLENBQUE7SUFDaEMsT0FBT0QsS0FBSyxDQUFDRSxHQUFHLENBQUMsS0FBS0YsS0FBSyxDQUFDRSxHQUFHLENBQUMsR0FBR0EsR0FBRyxDQUFDRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRSxDQUFDLENBQUE7RUFDdEUsQ0FBQyxFQUFFVCxNQUFNLENBQUNVLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0VBRXZCLE1BQU1DLFVBQVUsR0FBSUMsSUFBSSxJQUFLO0VBQzNCQSxFQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ0gsV0FBVyxFQUFFLENBQUE7RUFD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QUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtF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YyxHQUFHLEVBQUUsQ0FBQTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUNoYSxhQUFhLEdBQUdBLGFBQWEsQ0FBQTtFQUVwRCtaLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDblksWUFBWSxHQUFHQSxZQUFZLENBQUE7RUFFbERrWSxPQUFPLENBQUNDLGNBQWMsQ0FBQ0MsbUJBQW1CLEdBQUdBLElBQW1CLENBQUE7RUFFaEVGLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRSxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtFQUVoRUgsT0FBTyxDQUFDQyxjQUFjLENBQUNHLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0VBRWhFSixPQUFPLENBQUNDLGNBQWMsQ0FBQ2pVLGVBQWUsR0FBR0EsZUFBZSxDQUFBO0VBRXhEZ1UsT0FBTyxDQUFDQyxjQUFjLENBQUNSLGVBQWUsR0FBR0EsZUFBZTs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDUxLDUyLDUzLDU0LDU1LDU2LDU3LDU4LDU5LDYwLDYxLDYyLDYzLDY0LDY1LDY2LDY3LDY4LDY5LDcwLDcxLDcyLDczLDc0LDc1LDc2LDc3LDc4LDc5LDgwLDgxLDgyLDgzLDg0LDg1LDg2LDg3LDg4LDg5LDkwLDkxLDkyLDkzXX0=
