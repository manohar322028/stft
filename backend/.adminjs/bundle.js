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

  const {toString} = Object.prototype;
  const {getPrototypeOf} = Object;

  const kindOf = (cache => thing => {
      const str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));

  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type
  };

  const typeOfTest = type => thing => typeof thing === type;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const {isArray} = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined$1 = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined$1(val) && val.constructor !== null && !isUndefined$1(val.constructor)
      && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
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
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
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
  const isString$1 = typeOfTest('string');

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
  const isNumber$1 = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject$1 = (thing) => thing !== null && typeof thing === 'object';

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
  const isPlainObject = (val) => {
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
  const isDate = kindOfTest('Date');

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
  const isStream = (val) => isObject$1(val) && isFunction(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  const isFormData = (thing) => {
    let kind;
    return thing && (
      (typeof FormData === 'function' && thing instanceof FormData) || (
        isFunction(thing.append) && (
          (kind = kindOf(thing)) === 'formdata' ||
          // detect form-data instance
          (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
        )
      )
    )
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
  const trim = (str) => str.trim ?
    str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

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
  function forEach(obj, fn, {allOwnKeys = false} = {}) {
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

  function findKey(obj, key) {
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
    return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
  })();

  const isContextDefined = (context) => !isUndefined$1(context) && context !== _global;

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
  function merge(/* obj1, obj2, obj3, ... */) {
    const {caseless} = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
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
  const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {allOwnKeys});
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = (content) => {
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
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber$1(i)) return null;
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
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

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

  const freezeMethods = (obj) => {
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

    const define = (arr) => {
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
    const {length} = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length|0];
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

  const toJSONObject = (obj) => {
    const stack = new Array(10);

    const visit = (source, i) => {

      if (isObject$1(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }

        if(!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined$1(reducedValue) && (target[key] = reducedValue);
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

  const isThenable = (thing) =>
    thing && (isObject$1(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

  var utils$5 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString: isString$1,
    isNumber: isNumber$1,
    isBoolean,
    isObject: isObject$1,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined: isUndefined$1,
    isDate,
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
    hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
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
      this.stack = (new Error()).stack;
    }

    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }

  utils$5.inherits(AxiosError, Error, {
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
        config: utils$5.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });

  const prototype$1 = AxiosError.prototype;
  const descriptors = {};

  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(code => {
    descriptors[code] = {value: code};
  });

  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

  // eslint-disable-next-line func-names
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);

    utils$5.toFlatObject(error, axiosError, function filter(obj) {
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
    return utils$5.isPlainObject(thing) || utils$5.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$5.endsWith(key, '[]') ? key.slice(0, -2) : key;
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
    return utils$5.isArray(arr) && !arr.some(isVisitable);
  }

  const predicates = utils$5.toFlatObject(utils$5, {}, null, function filter(prop) {
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
    if (!utils$5.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$5.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$5.isUndefined(source[option]);
    });

    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && utils$5.isSpecCompliantForm(formData);

    if (!utils$5.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }

    function convertValue(value) {
      if (value === null) return '';

      if (utils$5.isDate(value)) {
        return value.toISOString();
      }

      if (!useBlob && utils$5.isBlob(value)) {
        throw new AxiosError('Blob is not supported. Use a Buffer instead.');
      }

      if (utils$5.isArrayBuffer(value) || utils$5.isTypedArray(value)) {
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
        if (utils$5.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (
          (utils$5.isArray(value) && isFlatArray(value)) ||
          ((utils$5.isFileList(value) || utils$5.endsWith(key, '[]')) && (arr = utils$5.toArray(value))
          )) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);

          arr.forEach(function each(el, index) {
            !(utils$5.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
              convertValue(el)
            );
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
      if (utils$5.isUndefined(value)) return;

      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }

      stack.push(value);

      utils$5.forEach(value, function each(el, key) {
        const result = !(utils$5.isUndefined(el) || el === null) && visitor.call(
          formData, el, utils$5.isString(key) ? key.trim() : key, path, exposedHelpers
        );

        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });

      stack.pop();
    }

    if (!utils$5.isObject(obj)) {
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
    const _encode = encoder ? function(value) {
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
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
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
      serializedParams = utils$5.isURLSearchParams(params) ?
        params.toString() :
        new AxiosURLSearchParams(params, options).toString(_encode);
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
      utils$5.forEach(this.handlers, function forEachHandler(h) {
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
  const hasStandardBrowserEnv = (
    (product) => {
      return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
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
    return (
      typeof WorkerGlobalScope !== 'undefined' &&
      // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts === 'function'
    );
  })();

  const origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    origin: origin
  });

  var platform = {
    ...utils$4,
    ...platform$1
  };

  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$5.isBuffer(value)) {
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
    return utils$5.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
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
      name = !name && utils$5.isArray(target) ? target.length : name;

      if (isLast) {
        if (utils$5.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }

        return !isNumericKey;
      }

      if (!target[name] || !utils$5.isObject(target[name])) {
        target[name] = [];
      }

      const result = buildPath(path, value, target[name], index);

      if (result && utils$5.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }

      return !isNumericKey;
    }

    if (utils$5.isFormData(formData) && utils$5.isFunction(formData.entries)) {
      const obj = {};

      utils$5.forEachEntry(formData, (name, value) => {
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
    if (utils$5.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$5.trim(rawValue);
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
      const isObjectPayload = utils$5.isObject(data);

      if (isObjectPayload && utils$5.isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = utils$5.isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }

      if (utils$5.isArrayBuffer(data) ||
        utils$5.isBuffer(data) ||
        utils$5.isStream(data) ||
        utils$5.isFile(data) ||
        utils$5.isBlob(data) ||
        utils$5.isReadableStream(data)
      ) {
        return data;
      }
      if (utils$5.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$5.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }

        if ((isFileList = utils$5.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          const _FormData = this.env && this.env.FormData;

          return toFormData(
            isFileList ? {'files[]': data} : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType ) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    }],

    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';

      if (utils$5.isResponse(data) || utils$5.isReadableStream(data)) {
        return data;
      }

      if (data && utils$5.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
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

  utils$5.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
    defaults.headers[method] = {};
  });

  var defaults$1 = defaults;

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$5.toObjectSet([
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ]);

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
  var parseHeaders = rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;

    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
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
  };

  const $internals = Symbol('internals');

  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }

  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }

    return utils$5.isArray(value) ? value.map(normalizeValue) : String(value);
  }

  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;

    while ((match = tokensRE.exec(str))) {
      tokens[match[1]] = match[2];
    }

    return tokens;
  }

  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$5.isFunction(filter)) {
      return filter.call(this, value, header);
    }

    if (isHeaderNameFilter) {
      value = header;
    }

    if (!utils$5.isString(value)) return;

    if (utils$5.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }

    if (utils$5.isRegExp(filter)) {
      return filter.test(value);
    }
  }

  function formatHeader(header) {
    return header.trim()
      .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
  }

  function buildAccessors(obj, header) {
    const accessorName = utils$5.toCamelCase(' ' + header);

    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
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

        const key = utils$5.findKey(self, lHeader);

        if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
          self[key || _header] = normalizeValue(_value);
        }
      }

      const setHeaders = (headers, _rewrite) =>
        utils$5.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

      if (utils$5.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if(utils$5.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$5.isHeaders(header)) {
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
        const key = utils$5.findKey(this, header);

        if (key) {
          const value = this[key];

          if (!parser) {
            return value;
          }

          if (parser === true) {
            return parseTokens(value);
          }

          if (utils$5.isFunction(parser)) {
            return parser.call(this, value, key);
          }

          if (utils$5.isRegExp(parser)) {
            return parser.exec(value);
          }

          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }

    has(header, matcher) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$5.findKey(this, header);

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
          const key = utils$5.findKey(self, _header);

          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];

            deleted = true;
          }
        }
      }

      if (utils$5.isArray(header)) {
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
        if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }

      return deleted;
    }

    normalize(format) {
      const self = this;
      const headers = {};

      utils$5.forEach(this, (value, header) => {
        const key = utils$5.findKey(headers, header);

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

      utils$5.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$5.isArray(value) ? value.join(', ') : value);
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

      targets.forEach((target) => computed.set(target));

      return computed;
    }

    static accessor(header) {
      const internals = this[$internals] = (this[$internals] = {
        accessors: {}
      });

      const accessors = internals.accessors;
      const prototype = this.prototype;

      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);

        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }

      utils$5.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

      return this;
    }
  }

  AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$5.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    }
  });

  utils$5.freezeMethods(AxiosHeaders);

  var AxiosHeaders$1 = AxiosHeaders;

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults$1;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;

    utils$5.forEach(fns, function transform(fn) {
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

  utils$5.inherits(CanceledError, AxiosError, {
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
      reject(new AxiosError(
        'Request failed with status code ' + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
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

  var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
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
        progress: total ? (loaded / total) : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null
      };

      data[isDownloadStream ? 'download' : 'upload'] = true;

      listener(data);
    }, freq);
  };

  var isURLSameOrigin = platform.hasStandardBrowserEnv ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
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
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
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
        const parsed = (utils$5.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })();

  var cookies = platform.hasStandardBrowserEnv ?

    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + '=' + encodeURIComponent(value)];

        utils$5.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

        utils$5.isString(path) && cookie.push('path=' + path);

        utils$5.isString(domain) && cookie.push('domain=' + domain);

        secure === true && cookie.push('secure');

        document.cookie = cookie.join('; ');
      },

      read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    }

    :

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
    return relativeURL
      ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
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

  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

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
      if (utils$5.isPlainObject(target) && utils$5.isPlainObject(source)) {
        return utils$5.merge.call({caseless}, target, source);
      } else if (utils$5.isPlainObject(source)) {
        return utils$5.merge({}, source);
      } else if (utils$5.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, caseless) {
      if (!utils$5.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils$5.isUndefined(a)) {
        return getMergedValue(undefined, a, caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$5.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$5.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$5.isUndefined(a)) {
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

    utils$5.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge(config1[prop], config2[prop], prop);
      (utils$5.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  }

  var resolveConfig = (config) => {
    const newConfig = mergeConfig({}, config);

    let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

    newConfig.headers = headers = AxiosHeaders$1.from(headers);

    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' +
        btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
      );
    }

    let contentType;

    if (utils$5.isFormData(data)) {
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
      withXSRFToken && utils$5.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
        // Add xsrf header
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }

    return newConfig;
  };

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      let {responseType} = _config;
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
        const responseHeaders = AxiosHeaders$1.from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
          request.responseText : request.response;
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
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          _config,
          request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$5.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$5.isUndefined(_config.withCredentials)) {
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
          signal &&
          (signal.removeEventListener ? signal.removeEventListener('abort', onabort) : signal.unsubscribe(onabort));
        });
        signals = null;
      }
    };

    signals.forEach((signal) => signal && signal.addEventListener && signal.addEventListener('abort', onabort));

    const {signal} = controller;

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
      yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : (await encode(String(chunk))), chunkSize);
    }
  };

  const trackStream = (stream, chunkSize, onProgress, onFinish, encode) => {
    const iterator = readBytes(stream, chunkSize, encode);

    let bytes = 0;

    return new ReadableStream({
      type: 'bytes',

      async pull(controller) {
        const {done, value} = await iterator.next();

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
    })
  };

  const fetchProgressDecorator = (total, fn) => {
    const lengthComputable = total != null;
    return (loaded) => setTimeout(() => fn({
      lengthComputable,
      total,
      loaded
    }));
  };

  const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
      ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
      async (str) => new Uint8Array(await new Response(str).arrayBuffer())
  );

  const supportsRequestStream = isReadableStreamSupported && (() => {
    let duplexAccessed = false;

    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');

    return duplexAccessed && !hasContentType;
  })();

  const DEFAULT_CHUNK_SIZE = 64 * 1024;

  const supportsResponseStream = isReadableStreamSupported && !!(()=> {
    try {
      return utils$5.isReadableStream(new Response('').body);
    } catch(err) {
      // return undefined
    }
  })();

  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };

  isFetchSupported && (((res) => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = utils$5.isFunction(res[type]) ? (res) => res[type]() :
        (_, config) => {
          throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
        });
    });
  })(new Response));

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if(utils$5.isBlob(body)) {
      return body.size;
    }

    if(utils$5.isSpecCompliantForm(body)) {
      return (await new Request(body).arrayBuffer()).byteLength;
    }

    if(utils$5.isArrayBufferView(body)) {
      return body.byteLength;
    }

    if(utils$5.isURLSearchParams(body)) {
      body = body + '';
    }

    if(utils$5.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = utils$5.toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  var fetchAdapter = isFetchSupported && (async (config) => {
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

    let [composedSignal, stopTimeout] = (signal || cancelToken || timeout) ?
      composeSignals([signal, cancelToken], timeout) : [];

    let finished, request;

    const onFinish = () => {
      !finished && setTimeout(() => {
        composedSignal && composedSignal.unsubscribe();
      });

      finished = true;
    };

    let requestContentLength;

    try {
      if (
        onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
        (requestContentLength = await resolveBodyLength(headers, data)) !== 0
      ) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });

        let contentTypeHeader;

        if (utils$5.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }

        if (_request.body) {
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(
            requestContentLength,
            progressEventReducer(onUploadProgress)
          ), null, encodeText);
        }
      }

      if (!utils$5.isString(withCredentials)) {
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

        const responseContentLength = utils$5.toFiniteNumber(response.headers.get('content-length'));

        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(
            responseContentLength,
            progressEventReducer(onDownloadProgress, true)
          ), isStreamResponse && onFinish, encodeText),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[utils$5.findKey(resolvers, responseType) || 'text'](response, config);

      !isStreamResponse && onFinish();

      stopTimeout && stopTimeout();

      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      })
    } catch (err) {
      onFinish();

      if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        )
      }

      throw AxiosError.from(err, err && err.code, config, request);
    }
  });

  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };

  utils$5.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {value});
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {value});
    }
  });

  const renderReason = (reason) => `- ${reason}`;

  const isResolvedHandle = (adapter) => utils$5.isFunction(adapter) || adapter === null || adapter === false;

  var adapters = {
    getAdapter: (adapters) => {
      adapters = utils$5.isArray(adapters) ? adapters : [adapters];

      const {length} = adapters;
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

        const reasons = Object.entries(rejectedReasons)
          .map(([id, state]) => `adapter ${id} ` +
            (state === false ? 'is not supported by the environment' : 'is not available in the build')
          );

        let s = length ?
          (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
          'as no adapter specified';

        throw new AxiosError(
          `There is no suitable adapter to dispatch the request ` + s,
          'ERR_NOT_SUPPORT'
        );
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

    config.headers = AxiosHeaders$1.from(config.headers);

    // Transform request data
    config.data = transformData.call(
      config,
      config.transformRequest
    );

    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }

    const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );

      response.headers = AxiosHeaders$1.from(response.headers);

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
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
        throw new AxiosError(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
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

          Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

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

      const {transitional, paramsSerializer, headers} = config;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }

      if (paramsSerializer != null) {
        if (utils$5.isFunction(paramsSerializer)) {
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
      let contextHeaders = headers && utils$5.merge(
        headers.common,
        headers[config.method]
      );

      headers && utils$5.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        (method) => {
          delete headers[method];
        }
      );

      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

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
  utils$5.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });

  utils$5.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
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

  var Axios$1 = Axios;

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

  var CancelToken$1 = CancelToken;

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
    return utils$5.isObject(payload) && (payload.isAxiosError === true);
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
    NetworkAuthenticationRequired: 511,
  };

  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });

  var HttpStatusCode$1 = HttpStatusCode;

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);

    // Copy axios.prototype to instance
    utils$5.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

    // Copy context to instance
    utils$5.extend(instance, context, null, {allOwnKeys: true});

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults$1);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios$1;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
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

  axios.AxiosHeaders = AxiosHeaders$1;

  axios.formToJSON = thing => formDataToJSON(utils$5.isHTMLForm(thing) ? new FormData(thing) : thing);

  axios.getAdapter = adapters.getAdapter;

  axios.HttpStatusCode = HttpStatusCode$1;

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
        const certificate = res.data.membership_certificate;
        const certificateUrl = `${api_url}/uploads/${certificate}`;
        const emailData = {
          to: record?.params.email,
          subject: "Membership Approved",
          text: `Congratulations! Your membership has been approved. You can download your certificate from the following link: ${certificateUrl}`
        };
        await axios.post(`${api_url}/api/members/send-email`, emailData);
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
        const certificate = res.data.record.params.membership_certificate;
        const certificateUrl = `${api_url}/uploads/${certificate}`;
        const emailData = {
          to: record?.params.email,
          subject: "Membership Approved",
          text: `Congratulations! Your membership has been approved. You can download your certificate from the following link: ${certificateUrl}`
        };
        await axios.post(`${api_url}/api/members/send-email`, emailData);
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var converter = {};

  var constants = {};

  Object.defineProperty(constants, "__esModule", { value: true });
  constants.excelBOM = constants.defaultCsv2JsonOptions = constants.defaultJson2CsvOptions = constants.errors = void 0;
  constants.errors = {
      optionsRequired: 'Options were not passed and are required.',
      json2csv: {
          cannotCallOn: 'Cannot call json2csv on',
          dataCheckFailure: 'Data provided was not an array of documents.',
          notSameSchema: 'Not all documents have the same schema.'
      },
      csv2json: {
          cannotCallOn: 'Cannot call csv2json on',
          dataCheckFailure: 'CSV is not a string.'
      }
  };
  constants.defaultJson2CsvOptions = {
      arrayIndexesAsKeys: false,
      checkSchemaDifferences: false,
      delimiter: {
          field: ',',
          wrap: '"',
          eol: '\n'
      },
      emptyFieldValue: undefined,
      escapeHeaderNestedDots: true,
      excelBOM: false,
      excludeKeys: [],
      expandNestedObjects: true,
      expandArrayObjects: false,
      prependHeader: true,
      preventCsvInjection: false,
      sortHeader: false,
      trimFieldValues: false,
      trimHeaderFields: false,
      unwindArrays: false,
      useDateIso8601Format: false,
      useLocaleFormat: false,
      wrapBooleans: false,
  };
  constants.defaultCsv2JsonOptions = {
      delimiter: {
          field: ',',
          wrap: '"',
          eol: '\n'
      },
      excelBOM: false,
      preventCsvInjection: false,
      trimFieldValues: false,
      trimHeaderFields: false,
  };
  constants.excelBOM = '\ufeff';

  var json2csv$1 = {};

  var path = {};

  /**
   * @license MIT
   * doc-path <https://github.com/mrodrig/doc-path>
   * Copyright (c) 2015-present, Michael Rodrigues.
   */
  Object.defineProperty(path, "__esModule", { value: true });
  path.setPath = path.evaluatePath = void 0;
  /**
   * Main function that evaluates the path in a particular object
   * @throws {Error} possible error if call stack size is exceeded
   */
  function evaluatePath(obj, kp) {
      if (!obj) {
          return null;
      }
      const { dotIndex, key, remaining } = state(kp);
      const kpVal = typeof obj === 'object' && kp in obj ? obj[kp] : undefined;
      const keyVal = typeof obj === 'object' && key in obj ? obj[key] : undefined;
      if (dotIndex >= 0 && typeof obj === 'object' && !(kp in obj)) {
          const { key: nextKey } = state(remaining);
          const nextKeyAsInt = parseInt(nextKey);
          // If there's an array at the current key in the object, then iterate over those items evaluating the remaining path
          if (Array.isArray(keyVal) && isNaN(nextKeyAsInt)) {
              return keyVal.map((doc) => evaluatePath(doc, remaining));
          }
          // Otherwise, we can just recur
          return evaluatePath(keyVal, remaining);
      }
      else if (Array.isArray(obj)) {
          const keyAsInt = parseInt(key);
          if (kp === key && dotIndex === -1 && !isNaN(keyAsInt)) {
              return keyVal;
          }
          // If this object is actually an array, then iterate over those items evaluating the path
          return obj.map((doc) => evaluatePath(doc, kp));
      }
      else if (dotIndex >= 0 && kp !== key && typeof obj === 'object' && key in obj) {
          // If there's a field with a non-nested dot, then recur into that sub-value
          return evaluatePath(keyVal, remaining);
      }
      else if (dotIndex === -1 && typeof obj === 'object' && key in obj && !(kp in obj)) {
          // If the field is here, but the key was escaped
          return keyVal;
      }
      // Otherwise, we can just return value directly
      return kpVal;
  }
  path.evaluatePath = evaluatePath;
  /**
   * Main function that performs validation before passing off to _sp
   * @throws {Error} possible error if call stack size is exceeded
   */
  function setPath(obj, kp, v) {
      if (!obj) {
          throw new Error('No object was provided.');
      }
      else if (!kp) {
          throw new Error('No keyPath was provided.');
      }
      return _sp(obj, kp, v);
  }
  path.setPath = setPath;
  // Helper function that will set the value in the provided object/array.
  function _sp(obj, kp, v) {
      const { dotIndex, key, remaining } = state(kp);
      // If this is clearly a prototype pollution attempt, then refuse to modify the path
      if (kp.startsWith('__proto__') || kp.startsWith('constructor') || kp.startsWith('prototype')) {
          return obj;
      }
      if (dotIndex >= 0) {
          const keyAsInt = parseInt(key);
          // If there is a '.' in the key path, recur on the subdoc and ...
          if (typeof obj === 'object' && obj !== null && !(key in obj) && Array.isArray(obj) && !isNaN(keyAsInt)) {
              // If there's no value at obj[key] then populate an empty object
              obj[key] = obj[key] ?? {};
              // Continue iterating on the rest of the key path to set the appropriate value where intended and then return
              _sp(obj[key], remaining, v);
              return obj;
          }
          else if (typeof obj === 'object' && obj !== null && !(key in obj) && Array.isArray(obj)) {
              // If this is an array and there are multiple levels of keys to iterate over, recur.
              obj.forEach((doc) => _sp(doc, kp, v));
              return obj;
          }
          else if (typeof obj === 'object' && obj !== null && !(key in obj) && !Array.isArray(obj)) {
              const { key: nextKey } = state(remaining);
              const nextKeyAsInt = parseInt(nextKey);
              if (!isNaN(nextKeyAsInt)) {
                  // If the current key doesn't exist yet and the next key is a number (likely array index), populate an empty array
                  obj[key] = [];
              }
              else if (remaining === '') {
                  // If the remaining key is empty, then a `.` character appeared right at the end of the path and wasn't actually indicating a separate level
                  obj[kp] = v;
                  return obj;
              }
              else {
                  // If the current key doesn't exist yet, populate it
                  obj[key] = {};
              }
          }
          _sp(obj[key], remaining, v);
      }
      else if (Array.isArray(obj)) {
          const keyAsInt = parseInt(key);
          // If the object is an array and this key is an int (likely array index), then set the value directly and return
          if (kp === key && dotIndex === -1 && !isNaN(keyAsInt)) {
              obj[key] = v;
              return obj;
          }
          // If this "obj" is actually an array, then we can loop over each of the values and set the path
          obj.forEach((doc) => _sp(doc, remaining, v));
          return obj;
      }
      else {
          // Otherwise, we can set the path directly
          obj[key] = v;
      }
      return obj;
  }
  // Helper function that returns some information necessary to evaluate or set a path  based on the provided keyPath value
  function state(kp) {
      const dotIndex = findFirstNonEscapedDotIndex(kp);
      return {
          dotIndex,
          key: kp.slice(0, dotIndex >= 0 ? dotIndex : undefined).replace(/\\./g, '.'),
          remaining: kp.slice(dotIndex + 1)
      };
  }
  function findFirstNonEscapedDotIndex(kp) {
      for (let i = 0; i < kp.length; i++) {
          const previousChar = i > 0 ? kp[i - 1] : '', currentChar = kp[i];
          if (currentChar === '.' && previousChar !== '\\')
              return i;
      }
      return -1;
  }

  var deeks = {};

  var utils$3 = {};

  Object.defineProperty(utils$3, "__esModule", { value: true });
  utils$3.isDocumentToRecurOn = utils$3.flatten = utils$3.unique = void 0;
  function unique$1(array) {
      return [...new Set(array)];
  }
  utils$3.unique = unique$1;
  function flatten$1(array) {
      return [].concat(...array);
  }
  utils$3.flatten = flatten$1;
  /**
   * Returns whether this value is a document to recur on or not
   * @param val Any item whose type will be evaluated
   * @returns {boolean}
   */
  function isDocumentToRecurOn(val) {
      return typeof val === 'object' && val !== null && !Array.isArray(val) && Object.keys(val).length;
  }
  utils$3.isDocumentToRecurOn = isDocumentToRecurOn;

  var types = {};

  Object.defineProperty(types, "__esModule", { value: true });

  (function (exports) {
  	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  	    if (k2 === undefined) k2 = k;
  	    var desc = Object.getOwnPropertyDescriptor(m, k);
  	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
  	      desc = { enumerable: true, get: function() { return m[k]; } };
  	    }
  	    Object.defineProperty(o, k2, desc);
  	}) : (function(o, m, k, k2) {
  	    if (k2 === undefined) k2 = k;
  	    o[k2] = m[k];
  	}));
  	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
  	    Object.defineProperty(o, "default", { enumerable: true, value: v });
  	}) : function(o, v) {
  	    o["default"] = v;
  	});
  	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
  	    if (mod && mod.__esModule) return mod;
  	    var result = {};
  	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  	    __setModuleDefault(result, mod);
  	    return result;
  	};
  	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
  	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  	};
  	Object.defineProperty(exports, "__esModule", { value: true });
  	exports.deepKeysFromList = exports.deepKeys = void 0;
  	const utils = __importStar(utils$3);
  	__exportStar(types, exports);
  	/**
  	 * Return the deep keys list for a single document
  	 * @param object
  	 * @param options
  	 * @returns {Array}
  	 */
  	function deepKeys(object, options) {
  	    const parsedOptions = mergeOptions(options);
  	    if (typeof object === 'object' && object !== null) {
  	        return generateDeepKeysList('', object, parsedOptions);
  	    }
  	    return [];
  	}
  	exports.deepKeys = deepKeys;
  	/**
  	 * Return the deep keys list for all documents in the provided list
  	 * @param list
  	 * @param options
  	 * @returns Array[Array[String]]
  	 */
  	function deepKeysFromList(list, options) {
  	    const parsedOptions = mergeOptions(options);
  	    return list.map((document) => {
  	        if (typeof document === 'object' && document !== null) {
  	            // if the data at the key is a document, then we retrieve the subHeading starting with an empty string heading and the doc
  	            return deepKeys(document, parsedOptions);
  	        }
  	        return [];
  	    });
  	}
  	exports.deepKeysFromList = deepKeysFromList;
  	function generateDeepKeysList(heading, data, options) {
  	    const keys = Object.keys(data).map((currentKey) => {
  	        // If the given heading is empty, then we set the heading to be the subKey, otherwise set it as a nested heading w/ a dot
  	        const keyName = buildKeyName(heading, escapeNestedDotsIfSpecified(currentKey, options));
  	        // If we have another nested document, recur on the sub-document to retrieve the full key name
  	        if (options.expandNestedObjects && utils.isDocumentToRecurOn(data[currentKey]) || (options.arrayIndexesAsKeys && Array.isArray(data[currentKey]) && data[currentKey].length)) {
  	            return generateDeepKeysList(keyName, data[currentKey], options);
  	        }
  	        else if (options.expandArrayObjects && Array.isArray(data[currentKey])) {
  	            // If we have a nested array that we need to recur on
  	            return processArrayKeys(data[currentKey], keyName, options);
  	        }
  	        else if (options.ignoreEmptyArrays && Array.isArray(data[currentKey]) && !data[currentKey].length) {
  	            return [];
  	        }
  	        // Otherwise return this key name since we don't have a sub document
  	        return keyName;
  	    });
  	    return utils.flatten(keys);
  	}
  	/**
  	 * Helper function to handle the processing of arrays when the expandArrayObjects
  	 * option is specified.
  	 * @param subArray
  	 * @param currentKeyPath
  	 * @param options
  	 * @returns {*}
  	 */
  	function processArrayKeys(subArray, currentKeyPath, options) {
  	    let subArrayKeys = deepKeysFromList(subArray, options);
  	    if (!subArray.length) {
  	        return options.ignoreEmptyArraysWhenExpanding ? [] : [currentKeyPath];
  	    }
  	    else if (subArray.length && utils.flatten(subArrayKeys).length === 0) {
  	        // Has items in the array, but no objects
  	        return [currentKeyPath];
  	    }
  	    else {
  	        subArrayKeys = subArrayKeys.map((schemaKeys) => {
  	            if (Array.isArray(schemaKeys) && schemaKeys.length === 0) {
  	                return [currentKeyPath];
  	            }
  	            return schemaKeys.map((subKey) => buildKeyName(currentKeyPath, escapeNestedDotsIfSpecified(subKey, options)));
  	        });
  	        return utils.unique(utils.flatten(subArrayKeys));
  	    }
  	}
  	function escapeNestedDotsIfSpecified(key, options) {
  	    if (options.escapeNestedDots) {
  	        return key.replace(/\./g, '\\.');
  	    }
  	    return key;
  	}
  	/**
  	 * Function used to generate the key path
  	 * @param upperKeyName String accumulated key path
  	 * @param currentKeyName String current key name
  	 * @returns String
  	 */
  	function buildKeyName(upperKeyName, currentKeyName) {
  	    if (upperKeyName) {
  	        return upperKeyName + '.' + currentKeyName;
  	    }
  	    return currentKeyName;
  	}
  	function mergeOptions(options) {
  	    return {
  	        arrayIndexesAsKeys: false,
  	        expandNestedObjects: true,
  	        expandArrayObjects: false,
  	        ignoreEmptyArraysWhenExpanding: false,
  	        escapeNestedDots: false,
  	        ignoreEmptyArrays: false,
  	        ...(options ?? {})
  	    };
  	} 
  } (deeks));

  var utils$2 = {};

  Object.defineProperty(utils$2, "__esModule", { value: true });
  utils$2.isInvalid = utils$2.flatten = utils$2.unique = utils$2.arrayDifference = utils$2.isError = utils$2.isUndefined = utils$2.isNull = utils$2.isObject = utils$2.isString = utils$2.isNumber = utils$2.unwind = utils$2.getNCharacters = utils$2.removeEmptyFields = utils$2.isEmptyField = utils$2.computeSchemaDifferences = utils$2.isDateRepresentation = utils$2.isStringRepresentation = utils$2.deepCopy = utils$2.validate = utils$2.buildC2JOptions = utils$2.buildJ2COptions = void 0;
  const doc_path_1$2 = path;
  const constants_1$3 = constants;
  const dateStringRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/, MAX_ARRAY_LENGTH = 100000;
  /**
   * Build the options to be passed to the appropriate function
   * If a user does not provide custom options, then we use our default
   * If options are provided, then we set each valid key that was passed
   */
  function buildJ2COptions(opts) {
      return {
          ...constants_1$3.defaultJson2CsvOptions,
          ...opts,
          delimiter: {
              field: opts?.delimiter?.field ?? constants_1$3.defaultJson2CsvOptions.delimiter.field,
              wrap: opts?.delimiter?.wrap || constants_1$3.defaultJson2CsvOptions.delimiter.wrap,
              eol: opts?.delimiter?.eol || constants_1$3.defaultJson2CsvOptions.delimiter.eol,
          },
          fieldTitleMap: Object.create({}),
      };
  }
  utils$2.buildJ2COptions = buildJ2COptions;
  /**
   * Build the options to be passed to the appropriate function
   * If a user does not provide custom options, then we use our default
   * If options are provided, then we set each valid key that was passed
   */
  function buildC2JOptions(opts) {
      return {
          ...constants_1$3.defaultCsv2JsonOptions,
          ...opts,
          delimiter: {
              field: opts?.delimiter?.field ?? constants_1$3.defaultCsv2JsonOptions.delimiter.field,
              wrap: opts?.delimiter?.wrap || constants_1$3.defaultCsv2JsonOptions.delimiter.wrap,
              eol: opts?.delimiter?.eol || constants_1$3.defaultCsv2JsonOptions.delimiter.eol,
          },
      };
  }
  utils$2.buildC2JOptions = buildC2JOptions;
  function validate(data, validationFn, errorMessages) {
      if (!data)
          throw new Error(`${errorMessages.cannotCallOn} ${data}.`);
      if (!validationFn(data))
          throw new Error(errorMessages.dataCheckFailure);
      return true;
  }
  utils$2.validate = validate;
  /**
   * Utility function to deep copy an object, used by the module tests
   */
  function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
  }
  utils$2.deepCopy = deepCopy;
  /**
   * Helper function that determines whether the provided value is a representation
   *   of a string. Given the RFC4180 requirements, that means that the value is
   *   wrapped in value wrap delimiters (usually a quotation mark on each side).
   */
  function isStringRepresentation(fieldValue, options) {
      const firstChar = fieldValue[0], lastIndex = fieldValue.length - 1, lastChar = fieldValue[lastIndex];
      // If the field starts and ends with a wrap delimiter
      return firstChar === options.delimiter.wrap && lastChar === options.delimiter.wrap;
  }
  utils$2.isStringRepresentation = isStringRepresentation;
  /**
   * Helper function that determines whether the provided value is a representation
   *   of a date.
   */
  function isDateRepresentation(fieldValue) {
      return dateStringRegex.test(fieldValue);
  }
  utils$2.isDateRepresentation = isDateRepresentation;
  /**
   * Helper function that determines the schema differences between two objects.
   */
  function computeSchemaDifferences(schemaA, schemaB) {
      return arrayDifference(schemaA, schemaB)
          .concat(arrayDifference(schemaB, schemaA));
  }
  utils$2.computeSchemaDifferences = computeSchemaDifferences;
  /**
   * Utility function to check if a field is considered empty so that the emptyFieldValue can be used instead
   */
  function isEmptyField(fieldValue) {
      return isUndefined(fieldValue) || isNull(fieldValue) || fieldValue === '';
  }
  utils$2.isEmptyField = isEmptyField;
  /**
   * Helper function that removes empty field values from an array.
   */
  function removeEmptyFields(fields) {
      return fields.filter((field) => !isEmptyField(field));
  }
  utils$2.removeEmptyFields = removeEmptyFields;
  /**
   * Helper function that retrieves the next n characters from the start index in
   *   the string including the character at the start index. This is used to
   *   check if are currently at an EOL value, since it could be multiple
   *   characters in length (eg. '\r\n')
   */
  function getNCharacters(str, start, n) {
      return str.substring(start, start + n);
  }
  utils$2.getNCharacters = getNCharacters;
  /**
   * The following unwind functionality is a heavily modified version of @edwincen's
   * unwind extension for lodash. Since lodash is a large package to require in,
   * and all of the required functionality was already being imported, either
   * natively or with doc-path, I decided to rewrite the majority of the logic
   * so that an additional dependency would not be required. The original code
   * with the lodash dependency can be found here:
   *
   * https://github.com/edwincen/unwind/blob/master/index.js
   */
  /**
   * Core function that unwinds an item at the provided path
   */
  function unwindItem(accumulator, item, fieldPath) {
      const valueToUnwind = (0, doc_path_1$2.evaluatePath)(item, fieldPath);
      let cloned = deepCopy(item);
      if (Array.isArray(valueToUnwind) && valueToUnwind.length) {
          valueToUnwind.forEach((val) => {
              cloned = deepCopy(item);
              accumulator.push((0, doc_path_1$2.setPath)(cloned, fieldPath, val));
          });
      }
      else if (Array.isArray(valueToUnwind) && valueToUnwind.length === 0) {
          // Push an empty string so the value is empty since there are no values
          (0, doc_path_1$2.setPath)(cloned, fieldPath, '');
          accumulator.push(cloned);
      }
      else {
          accumulator.push(cloned);
      }
  }
  /**
   * Main unwind function which takes an array and a field to unwind.
   */
  function unwind(array, field) {
      const result = [];
      array.forEach((item) => {
          unwindItem(result, item, field);
      });
      return result;
  }
  utils$2.unwind = unwind;
  /**
   * Checks whether value can be converted to a number
   */
  function isNumber(value) {
      return !isNaN(Number(value));
  }
  utils$2.isNumber = isNumber;
  /*
   * Helper functions which were created to remove underscorejs from this package.
   */
  function isString(value) {
      return typeof value === 'string';
  }
  utils$2.isString = isString;
  function isObject(value) {
      return typeof value === 'object';
  }
  utils$2.isObject = isObject;
  function isNull(value) {
      return value === null;
  }
  utils$2.isNull = isNull;
  function isUndefined(value) {
      return typeof value === 'undefined';
  }
  utils$2.isUndefined = isUndefined;
  function isError(value) {
      // TODO(mrodrig): test this possible change
      // return value instanceof Error;
      return Object.prototype.toString.call(value) === '[object Error]';
  }
  utils$2.isError = isError;
  function arrayDifference(a, b) {
      return a.filter((x) => !b.includes(x));
  }
  utils$2.arrayDifference = arrayDifference;
  function unique(array) {
      return [...new Set(array)];
  }
  utils$2.unique = unique;
  function flatten(array) {
      // Node 11+ - use the native array flattening function
      if (array.flat) {
          return array.flat();
      }
      // #167 - allow browsers to flatten very long 200k+ element arrays
      if (array.length > MAX_ARRAY_LENGTH) {
          let safeArray = [];
          for (let a = 0; a < array.length; a += MAX_ARRAY_LENGTH) {
              safeArray = safeArray.concat(...array.slice(a, a + MAX_ARRAY_LENGTH));
          }
          return safeArray;
      }
      return array.reduce((accumulator, value) => accumulator.concat(value), []);
  }
  utils$2.flatten = flatten;
  /**
   * Used to help avoid incorrect values returned by JSON.parse when converting
   * CSV back to JSON, such as '39e1804' which JSON.parse converts to Infinity
   */
  function isInvalid(parsedJson) {
      return parsedJson === Infinity ||
          parsedJson === -Infinity;
  }
  utils$2.isInvalid = isInvalid;

  var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
      __setModuleDefault$1(result, mod);
      return result;
  };
  Object.defineProperty(json2csv$1, "__esModule", { value: true });
  json2csv$1.Json2Csv = void 0;
  const doc_path_1$1 = path;
  const deeks_1 = deeks;
  const constants_1$2 = constants;
  const utils$1 = __importStar$1(utils$2);
  const Json2Csv = function (options) {
      const wrapDelimiterCheckRegex = new RegExp(options.delimiter.wrap, 'g'), crlfSearchRegex = /\r?\n|\r/, customValueParser = options.parseValue && typeof options.parseValue === 'function' ? options.parseValue : null, expandingWithoutUnwinding = options.expandArrayObjects && !options.unwindArrays, deeksOptions = {
          arrayIndexesAsKeys: options.arrayIndexesAsKeys,
          expandNestedObjects: options.expandNestedObjects,
          expandArrayObjects: expandingWithoutUnwinding,
          ignoreEmptyArraysWhenExpanding: expandingWithoutUnwinding,
          escapeNestedDots: true,
      };
      /** HEADER FIELD FUNCTIONS **/
      /**
       * Returns the list of data field names of all documents in the provided list
       */
      function getFieldNameList(data) {
          // If keys weren't specified, then we'll use the list of keys generated by the deeks module
          return (0, deeks_1.deepKeysFromList)(data, deeksOptions);
      }
      /**
       * Processes the schemas by checking for schema differences, if so desired.
       * If schema differences are not to be checked, then it resolves the unique
       * list of field names.
       */
      function processSchemas(documentSchemas) {
          // If the user wants to check for the same schema (regardless of schema ordering)
          if (options.checkSchemaDifferences) {
              return checkSchemaDifferences(documentSchemas);
          }
          else {
              // Otherwise, we do not care if the schemas are different, so we should get the unique list of keys
              const uniqueFieldNames = utils$1.unique(utils$1.flatten(documentSchemas));
              return uniqueFieldNames;
          }
      }
      /**
       * This function performs the schema difference check, if the user specifies that it should be checked.
       * If there are no field names, then there are no differences.
       * Otherwise, we get the first schema and the remaining list of schemas
       */
      function checkSchemaDifferences(documentSchemas) {
          // have multiple documents - ensure only one schema (regardless of field ordering)
          const firstDocSchema = documentSchemas[0], restOfDocumentSchemas = documentSchemas.slice(1), schemaDifferences = computeNumberOfSchemaDifferences(firstDocSchema, restOfDocumentSchemas);
          // If there are schema inconsistencies, throw a schema not the same error
          if (schemaDifferences) {
              throw new Error(constants_1$2.errors.json2csv.notSameSchema);
          }
          return firstDocSchema;
      }
      /**
       * Computes the number of schema differences
       */
      function computeNumberOfSchemaDifferences(firstDocSchema, restOfDocumentSchemas) {
          return restOfDocumentSchemas.reduce((schemaDifferences, documentSchema) => {
              // If there is a difference between the schemas, increment the counter of schema inconsistencies
              const numberOfDifferences = utils$1.computeSchemaDifferences(firstDocSchema, documentSchema).length;
              return numberOfDifferences > 0
                  ? schemaDifferences + 1
                  : schemaDifferences;
          }, 0);
      }
      /**
       * If so specified, this filters the detected key paths to exclude any keys that have been specified
       */
      function filterExcludedKeys(keyPaths) {
          if (options.excludeKeys) {
              return keyPaths.filter((keyPath) => {
                  for (const excludedKey of options.excludeKeys) {
                      // Only match if the excludedKey appears at the beginning of the string so we don't accidentally match a key farther down in a key path
                      const regex = excludedKey instanceof RegExp ? excludedKey : new RegExp(`^${excludedKey}`);
                      if (excludedKey === keyPath || keyPath.match(regex)) {
                          return false; // Exclude the key
                      }
                  }
                  return true; // Otherwise, include the key
              });
          }
          return keyPaths;
      }
      /**
       * If so specified, this sorts the header field names alphabetically
       */
      function sortHeaderFields(fieldNames) {
          if (options.sortHeader && typeof options.sortHeader === 'function') {
              return fieldNames.sort(options.sortHeader);
          }
          else if (options.sortHeader) {
              return fieldNames.sort();
          }
          return fieldNames;
      }
      /**
       * Trims the header fields, if the user desires them to be trimmed.
       */
      function trimHeaderFields(params) {
          if (options.trimHeaderFields) {
              params.headerFields = params.headerFields.map((field) => field.split('.')
                  .map((component) => component.trim())
                  .join('.'));
          }
          return params;
      }
      /**
       * Wrap the headings, if desired by the user.
       */
      function wrapHeaderFields(params) {
          // only perform this if we are actually prepending the header
          if (options.prependHeader) {
              params.headerFields = params.headerFields.map(function (headingKey) {
                  return wrapFieldValueIfNecessary(headingKey);
              });
          }
          return params;
      }
      /**
       * Generates the CSV header string by joining the headerFields by the field delimiter
       */
      function generateCsvHeader(params) {
          // #185 - generate a keys list to avoid finding native Map() methods
          const fieldTitleMapKeys = Object.keys(options.fieldTitleMap);
          params.header = params.headerFields
              .map(function (field) {
              let headerKey = field;
              // If a custom field title was provided for this field, use that
              if (fieldTitleMapKeys.includes(field)) {
                  headerKey = options.fieldTitleMap[field];
              }
              else if (!options.escapeHeaderNestedDots) {
                  // Otherwise, if the user doesn't want nested dots in keys to be escaped, then unescape them
                  headerKey = headerKey.replace(/\\\./g, '.');
              }
              return wrapFieldValueIfNecessary(headerKey);
          })
              .join(options.delimiter.field);
          return params;
      }
      function convertKeysToHeaderFields() {
          if (!options.keys)
              return [];
          return options.keys.map((key) => {
              if (typeof key === 'object' && 'field' in key) {
                  options.fieldTitleMap[key.field] = key.title ?? key.field;
                  return key.field;
              }
              return key;
          });
      }
      function extractWildcardMatchKeys() {
          if (!options.keys)
              return [];
          return options.keys.flatMap(item => {
              if (typeof item === 'string') {
                  // Exclude plain strings that were passed in options.keys
                  return [];
              }
              else if (item?.wildcardMatch) {
                  // Return "field" value for objects with wildcardMatch: true
                  return item.field;
              }
              // Exclude other objects
              return [];
          });
      }
      /**
       * Retrieve the headings for all documents and return it.
       * This checks that all documents have the same schema.
       */
      function retrieveHeaderFields(data) {
          const wildcardMatchKeys = extractWildcardMatchKeys();
          const keyStrings = convertKeysToHeaderFields();
          const fieldNames = getFieldNameList(data);
          const processed = processSchemas(fieldNames);
          if (options.keys) {
              options.keys = keyStrings;
              const matchedKeys = keyStrings.flatMap((userProvidedKey) => {
                  // If this is not a wildcard matched key, then just return and include it in the resulting key list
                  if (!wildcardMatchKeys.includes(userProvidedKey)) {
                      return userProvidedKey;
                  }
                  // Otherwise, identify all detected keys that match with the provided wildcard key:
                  const matches = [];
                  const regex = new RegExp(`^${userProvidedKey}`);
                  for (const detectedKey of processed) {
                      if (userProvidedKey === detectedKey || detectedKey.match(regex)) {
                          matches.push(detectedKey);
                      }
                  }
                  return matches;
              });
              if (!options.unwindArrays) {
                  const filtered = filterExcludedKeys(matchedKeys);
                  return sortHeaderFields(filtered);
              }
          }
          const filtered = filterExcludedKeys(processed);
          return sortHeaderFields(filtered);
      }
      /** RECORD FIELD FUNCTIONS **/
      /**
       * Unwinds objects in arrays within record objects if the user specifies the
       * expandArrayObjects option. If not specified, this passes the params
       * argument through to the next function in the promise chain.
       *
       * The `finalPass` parameter is used to trigger one last pass to ensure no more
       * arrays need to be expanded
       */
      function unwindRecordsIfNecessary(params, finalPass = false) {
          if (options.unwindArrays) {
              const originalRecordsLength = params.records.length;
              // Unwind each of the documents at the given headerField
              params.headerFields.forEach((headerField) => {
                  params.records = utils$1.unwind(params.records, headerField);
              });
              const headerFields = retrieveHeaderFields(params.records);
              params.headerFields = headerFields;
              // If we were able to unwind more arrays, then try unwinding again...
              if (originalRecordsLength !== params.records.length) {
                  return unwindRecordsIfNecessary(params);
              }
              // Otherwise, we didn't unwind any additional arrays, so continue...
              // Run a final time in case the earlier unwinding exposed additional
              // arrays to unwind...
              if (!finalPass) {
                  return unwindRecordsIfNecessary(params, true);
              }
              // If keys were provided, set the headerFields back to the provided keys after unwinding:
              if (options.keys) {
                  const userSelectedFields = convertKeysToHeaderFields();
                  params.headerFields = filterExcludedKeys(userSelectedFields);
              }
              return params;
          }
          return params;
      }
      /**
       * Main function which handles the processing of a record, or document to be converted to CSV format
       * This function specifies and performs the necessary operations in the necessary order
       * in order to obtain the data and convert it to CSV form while maintaining RFC 4180 compliance.
       * * Order of operations:
       * - Get fields from provided key list (as array of actual values)
       * - Convert the values to csv/string representation [possible option here for custom converters?]
       * - Trim fields
       * - Determine if they need to be wrapped (& wrap if necessary)
       * - Combine values for each line (by joining by field delimiter)
       */
      function processRecords(params) {
          params.recordString = params.records.map((record) => {
              // Retrieve data for each of the headerFields from this record
              const recordFieldData = retrieveRecordFieldData(record, params.headerFields), 
              // Process the data in this record and return the
              processedRecordData = recordFieldData.map((fieldValue) => {
                  fieldValue = trimRecordFieldValue(fieldValue);
                  fieldValue = preventCsvInjection(fieldValue);
                  let stringified = customValueParser ? customValueParser(fieldValue, recordFieldValueToString) : recordFieldValueToString(fieldValue);
                  stringified = wrapFieldValueIfNecessary(stringified);
                  return stringified;
              });
              // Join the record data by the field delimiter
              return generateCsvRowFromRecord(processedRecordData);
          }).join(options.delimiter.eol);
          return params;
      }
      /**
       * Helper function intended to process *just* array values when the expandArrayObjects setting is set to true
       */
      function processRecordFieldDataForExpandedArrayObject(recordFieldValue) {
          const filteredRecordFieldValue = utils$1.removeEmptyFields(recordFieldValue);
          // If we have an array and it's either empty of full of empty values, then use an empty value representation
          if (!recordFieldValue.length || !filteredRecordFieldValue.length) {
              return options.emptyFieldValue || '';
          }
          else if (filteredRecordFieldValue.length === 1) {
              // Otherwise, we have an array of actual values...
              // Since we are expanding array objects, we will want to key in on values of objects.
              return filteredRecordFieldValue[0]; // Extract the single value in the array
          }
          return recordFieldValue;
      }
      /**
       * Gets all field values from a particular record for the given list of fields
       */
      function retrieveRecordFieldData(record, fields) {
          const recordValues = [];
          fields.forEach((field) => {
              let recordFieldValue = (0, doc_path_1$1.evaluatePath)(record, field);
              if (!utils$1.isUndefined(options.emptyFieldValue) && utils$1.isEmptyField(recordFieldValue)) {
                  recordFieldValue = options.emptyFieldValue;
              }
              else if (options.expandArrayObjects && Array.isArray(recordFieldValue)) {
                  recordFieldValue = processRecordFieldDataForExpandedArrayObject(recordFieldValue);
              }
              recordValues.push(recordFieldValue);
          });
          return recordValues;
      }
      /**
       * Converts a record field value to its string representation
       */
      function recordFieldValueToString(fieldValue) {
          const isDate = fieldValue instanceof Date; // store to avoid checking twice
          if (fieldValue === null || Array.isArray(fieldValue) || typeof fieldValue === 'object' && !isDate) {
              return JSON.stringify(fieldValue);
          }
          else if (typeof fieldValue === 'undefined') {
              return 'undefined';
          }
          else if (isDate && options.useDateIso8601Format) {
              return fieldValue.toISOString();
          }
          else {
              return !options.useLocaleFormat ? fieldValue.toString() : fieldValue.toLocaleString();
          }
      }
      /**
       * Trims the record field value, if specified by the user's provided options
       */
      function trimRecordFieldValue(fieldValue) {
          if (options.trimFieldValues) {
              if (Array.isArray(fieldValue)) {
                  return fieldValue.map(trimRecordFieldValue);
              }
              else if (typeof fieldValue === 'string') {
                  return fieldValue.trim();
              }
              return fieldValue;
          }
          return fieldValue;
      }
      /**
       * Prevent CSV injection on strings if specified by the user's provided options.
       * Mitigation will be done by ensuring that the first character doesn't being with:
       * Equals (=), Plus (+), Minus (-), At (@), Tab (0x09), Carriage return (0x0D).
       * More info: https://owasp.org/www-community/attacks/CSV_Injection
       */
      function preventCsvInjection(fieldValue) {
          if (options.preventCsvInjection) {
              if (Array.isArray(fieldValue)) {
                  return fieldValue.map(preventCsvInjection);
              }
              else if (typeof fieldValue === 'string' && !utils$1.isNumber(fieldValue)) {
                  return fieldValue.replace(/^[=+\-@\t\r]+/g, '');
              }
              return fieldValue;
          }
          return fieldValue;
      }
      /**
       * Escapes quotation marks in the field value, if necessary, and appropriately
       * wraps the record field value if it contains a comma (field delimiter),
       * quotation mark (wrap delimiter), or a line break (CRLF)
       */
      function wrapFieldValueIfNecessary(fieldValue) {
          const wrapDelimiter = options.delimiter.wrap;
          // eg. includes quotation marks (default delimiter)
          if (fieldValue.includes(options.delimiter.wrap)) {
              // add an additional quotation mark before each quotation mark appearing in the field value
              fieldValue = fieldValue.replace(wrapDelimiterCheckRegex, wrapDelimiter + wrapDelimiter);
          }
          // if the field contains a comma (field delimiter), quotation mark (wrap delimiter), line break, or CRLF
          //   then enclose it in quotation marks (wrap delimiter)
          if (fieldValue.includes(options.delimiter.field) ||
              fieldValue.includes(options.delimiter.wrap) ||
              fieldValue.match(crlfSearchRegex) ||
              options.wrapBooleans && (fieldValue === 'true' || fieldValue === 'false')) {
              // wrap the field's value in a wrap delimiter (quotation marks by default)
              fieldValue = wrapDelimiter + fieldValue + wrapDelimiter;
          }
          return fieldValue;
      }
      /**
       * Generates the CSV record string by joining the field values together by the field delimiter
       */
      function generateCsvRowFromRecord(recordFieldValues) {
          return recordFieldValues.join(options.delimiter.field);
      }
      /** CSV COMPONENT COMBINER/FINAL PROCESSOR **/
      /**
       * Performs the final CSV construction by combining the fields in the appropriate
       * order depending on the provided options values and sends the generated CSV
       * back to the user
       */
      function generateCsvFromComponents(params) {
          const header = params.header, records = params.recordString, 
          // If we are prepending the header, then add an EOL, otherwise just return the records
          csv = (options.excelBOM ? constants_1$2.excelBOM : '') +
              (options.prependHeader ? header + options.delimiter.eol : '') +
              records;
          return csv;
      }
      /** MAIN CONVERTER FUNCTION **/
      /**
       * Internally exported json2csv function
       */
      function convert(data) {
          // Single document, not an array
          if (utils$1.isObject(data) && !data.length) {
              data = [data]; // Convert to an array of the given document
          }
          // Retrieve the heading and then generate the CSV with the keys that are identified
          const headerFields = {
              headerFields: retrieveHeaderFields(data),
              records: data,
              header: '',
              recordString: '',
          };
          const unwinded = unwindRecordsIfNecessary(headerFields);
          const processed = processRecords(unwinded);
          const wrapped = wrapHeaderFields(processed);
          const trimmed = trimHeaderFields(wrapped);
          const generated = generateCsvHeader(trimmed);
          return generateCsvFromComponents(generated);
      }
      return {
          convert,
      };
  };
  json2csv$1.Json2Csv = Json2Csv;

  var csv2json$1 = {};

  var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(csv2json$1, "__esModule", { value: true });
  csv2json$1.Csv2Json = void 0;
  const doc_path_1 = path;
  const constants_1$1 = constants;
  const utils = __importStar(utils$2);
  const Csv2Json = function (options) {
      const escapedWrapDelimiterRegex = new RegExp(options.delimiter.wrap + options.delimiter.wrap, 'g'), excelBOMRegex = new RegExp('^' + constants_1$1.excelBOM), valueParserFn = options.parseValue && typeof options.parseValue === 'function' ? options.parseValue : JSON.parse;
      /**
       * Trims the header key, if specified by the user via the provided options
       */
      function processHeaderKey(headerKey) {
          headerKey = removeWrapDelimitersFromValue(headerKey);
          if (options.trimHeaderFields) {
              return headerKey.split('.')
                  .map((component) => component.trim())
                  .join('.');
          }
          return headerKey;
      }
      /**
       * Generate the JSON heading from the CSV
       */
      function retrieveHeading(lines) {
          let headerFields = [];
          if (options.headerFields) {
              headerFields = options.headerFields.map((headerField, index) => ({
                  value: processHeaderKey(headerField),
                  index
              }));
          }
          else {
              // Generate and return the heading keys
              const headerRow = lines[0];
              headerFields = headerRow.map((headerKey, index) => ({
                  value: processHeaderKey(headerKey),
                  index
              }));
              // If the user provided keys, filter the generated keys to just the user provided keys so we also have the key index
              if (options.keys) {
                  const keys = options.keys; // TypeScript type checking work around to get it to recognize the option is not undefined
                  headerFields = headerFields.filter((headerKey) => keys.includes(headerKey.value));
              }
          }
          return {
              lines,
              headerFields,
              recordLines: [],
          };
      }
      /**
       * Removes the Excel BOM value, if specified by the options object
       */
      function stripExcelBOM(csv) {
          if (options.excelBOM) {
              return csv.replace(excelBOMRegex, '');
          }
          return csv;
      }
      /**
       * Helper function that splits a line so that we can handle wrapped fields
       */
      function splitLines(csv) {
          // Parse out the line...
          const lines = [], lastCharacterIndex = csv.length - 1, eolDelimiterLength = options.delimiter.eol.length, stateVariables = {
              insideWrapDelimiter: false,
              parsingValue: true,
              justParsedDoubleQuote: false,
              startIndex: 0
          };
          let splitLine = [], character, charBefore, charAfter, nextNChar, index = 0;
          // Loop through each character in the line to identify where to split the values
          while (index < csv.length) {
              // Current character
              character = csv[index];
              // Previous character
              charBefore = index ? csv[index - 1] : '';
              // Next character
              charAfter = index < lastCharacterIndex ? csv[index + 1] : '';
              // Next n characters, including the current character, where n = length(EOL delimiter)
              // This allows for the checking of an EOL delimiter when if it is more than a single character (eg. '\r\n')
              nextNChar = utils.getNCharacters(csv, index, eolDelimiterLength);
              if ((nextNChar === options.delimiter.eol && !stateVariables.insideWrapDelimiter ||
                  index === lastCharacterIndex) && charBefore === options.delimiter.field) {
                  // If we reached an EOL delimiter or the end of the csv and the previous character is a field delimiter...
                  // If the start index is the current index (and since the previous character is a comma),
                  //   then the value being parsed is an empty value accordingly, add an empty string
                  if (nextNChar === options.delimiter.eol && stateVariables.startIndex === index) {
                      splitLine.push('');
                  }
                  else if (character === options.delimiter.field) {
                      // If we reached the end of the CSV, there's no new line, and the current character is a comma
                      // then add an empty string for the current value
                      splitLine.push('');
                  }
                  else {
                      // Otherwise, there's a valid value, and the start index isn't the current index, grab the whole value
                      splitLine.push(csv.substring(stateVariables.startIndex));
                  }
                  // Since the last character is a comma, there's still an additional implied field value trailing the comma.
                  //   Since this value is empty, we push an extra empty value
                  splitLine.push('');
                  // Finally, push the split line values into the lines array and clear the split line
                  lines.push(splitLine);
                  splitLine = [];
                  stateVariables.startIndex = index + eolDelimiterLength;
                  stateVariables.parsingValue = true;
                  stateVariables.insideWrapDelimiter = charAfter === options.delimiter.wrap;
              }
              else if (index === lastCharacterIndex && character === options.delimiter.field) {
                  // If we reach the end of the CSV and the current character is a field delimiter
                  // Parse the previously seen value and add it to the line
                  const parsedValue = csv.substring(stateVariables.startIndex, index);
                  splitLine.push(parsedValue);
                  // Then add an empty string to the line since the last character being a field delimiter indicates an empty field
                  splitLine.push('');
                  lines.push(splitLine);
              }
              else if (index === lastCharacterIndex || nextNChar === options.delimiter.eol &&
                  // if we aren't inside wrap delimiters or if we are but the character before was a wrap delimiter and we didn't just see two
                  (!stateVariables.insideWrapDelimiter ||
                      stateVariables.insideWrapDelimiter && charBefore === options.delimiter.wrap && !stateVariables.justParsedDoubleQuote)) {
                  // Otherwise if we reached the end of the line or csv (and current character is not a field delimiter)
                  const toIndex = index !== lastCharacterIndex || charBefore === options.delimiter.wrap ? index : undefined;
                  // Retrieve the remaining value and add it to the split line list of values
                  splitLine.push(csv.substring(stateVariables.startIndex, toIndex));
                  // Finally, push the split line values into the lines array and clear the split line
                  lines.push(splitLine);
                  splitLine = [];
                  stateVariables.startIndex = index + eolDelimiterLength;
                  stateVariables.parsingValue = true;
                  stateVariables.insideWrapDelimiter = charAfter === options.delimiter.wrap;
              }
              else if (character === options.delimiter.wrap && charBefore === options.delimiter.field &&
                  !stateVariables.insideWrapDelimiter && !stateVariables.parsingValue) {
                  // If we reached a wrap delimiter after a comma and we aren't inside a wrap delimiter
                  stateVariables.startIndex = index;
                  stateVariables.insideWrapDelimiter = true;
                  stateVariables.parsingValue = true;
                  // If the next character(s) are an EOL delimiter, then skip them so we don't parse what we've seen as another value
                  if (utils.getNCharacters(csv, index + 1, eolDelimiterLength) === options.delimiter.eol) {
                      index += options.delimiter.eol.length + 1; // Skip past EOL
                  }
              }
              else if ((charBefore !== options.delimiter.wrap || stateVariables.justParsedDoubleQuote && charBefore === options.delimiter.wrap) &&
                  character === options.delimiter.wrap && utils.getNCharacters(csv, index + 1, eolDelimiterLength) === options.delimiter.eol) {
                  // If we reach a wrap which is not preceded by a wrap delim and the next character is an EOL delim (ie. *"\n)
                  stateVariables.insideWrapDelimiter = false;
                  stateVariables.parsingValue = false;
                  // Next iteration will substring, add the value to the line, and push the line onto the array of lines
              }
              else if (character === options.delimiter.wrap && (index === 0 || utils.getNCharacters(csv, index - eolDelimiterLength, eolDelimiterLength) === options.delimiter.eol && !stateVariables.insideWrapDelimiter)) {
                  // If the line starts with a wrap delimiter (ie. "*)
                  stateVariables.insideWrapDelimiter = true;
                  stateVariables.parsingValue = true;
                  stateVariables.startIndex = index;
              }
              else if (character === options.delimiter.wrap && charAfter === options.delimiter.field) {
                  // If we reached a wrap delimiter with a field delimiter after it (ie. *",)
                  splitLine.push(csv.substring(stateVariables.startIndex, index + 1));
                  stateVariables.startIndex = index + 2; // next value starts after the field delimiter
                  stateVariables.insideWrapDelimiter = false;
                  stateVariables.parsingValue = false;
              }
              else if (character === options.delimiter.wrap && charBefore === options.delimiter.field &&
                  !stateVariables.insideWrapDelimiter && stateVariables.parsingValue) {
                  // If we reached a wrap delimiter with a field delimiter after it (ie. ,"*)
                  splitLine.push(csv.substring(stateVariables.startIndex, index - 1));
                  stateVariables.insideWrapDelimiter = true;
                  stateVariables.parsingValue = true;
                  stateVariables.startIndex = index;
              }
              else if (character === options.delimiter.wrap && charAfter === options.delimiter.wrap && index !== stateVariables.startIndex) {
                  // If we run into an escaped quote (ie. "") skip past the second quote
                  index += 2;
                  stateVariables.justParsedDoubleQuote = true;
                  continue;
              }
              else if (character === options.delimiter.field && charBefore !== options.delimiter.wrap &&
                  charAfter !== options.delimiter.wrap && !stateVariables.insideWrapDelimiter &&
                  stateVariables.parsingValue) {
                  // If we reached a field delimiter and are not inside the wrap delimiters (ie. *,*)
                  splitLine.push(csv.substring(stateVariables.startIndex, index));
                  stateVariables.startIndex = index + 1;
              }
              else if (character === options.delimiter.field && charBefore === options.delimiter.wrap &&
                  charAfter !== options.delimiter.wrap && !stateVariables.parsingValue) {
                  // If we reached a field delimiter, the previous character was a wrap delimiter, and the
                  //   next character is not a wrap delimiter (ie. ",*)
                  stateVariables.insideWrapDelimiter = false;
                  stateVariables.parsingValue = true;
                  stateVariables.startIndex = index + 1;
              }
              // Otherwise increment to the next character
              index++;
              // Reset the double quote state variable
              stateVariables.justParsedDoubleQuote = false;
          }
          return lines;
      }
      /**
       * Retrieves the record lines from the split CSV lines and sets it on the params object
       */
      function retrieveRecordLines(params) {
          if (options.headerFields) { // This option is passed for instances where the CSV has no header line
              params.recordLines = params.lines;
          }
          else { // All lines except for the header line
              params.recordLines = params.lines.splice(1);
          }
          return params;
      }
      /**
       * Retrieves the value for the record from the line at the provided key.
       */
      function retrieveRecordValueFromLine(headerField, line) {
          // If there is a value at the key's index, use it; otherwise, null
          const value = line[headerField.index];
          // Perform any necessary value conversions on the record value
          return processRecordValue(value);
      }
      /**
       * Processes the record's value by parsing the data to ensure the CSV is
       * converted to the JSON that created it.
       */
      function processRecordValue(fieldValue) {
          // If the value is an array representation, convert it
          const parsedJson = parseValue(fieldValue);
          // If parsedJson is anything aside from an error, then we want to use the parsed value
          // This allows us to interpret values like 'null' --> null, 'false' --> false
          if (!utils.isError(parsedJson) && !utils.isInvalid(parsedJson)) {
              return parsedJson;
          }
          else if (fieldValue === 'undefined') {
              return undefined;
          }
          return fieldValue;
      }
      /**
       * Trims the record value, if specified by the user via the options object
       */
      function trimRecordValue(fieldValue) {
          if (options.trimFieldValues && fieldValue !== null) {
              return fieldValue.trim();
          }
          return fieldValue;
      }
      /**
       * Create a JSON document with the given keys (designated by the CSV header)
       *   and the values (from the given line)
       * @returns {Object} created json document
       */
      function createDocument(headerFields, line) {
          // Reduce the keys into a JSON document representing the given line
          return headerFields.reduce((document, headerField) => {
              // If there is a value at the key's index in the line, set the value; otherwise null
              const value = retrieveRecordValueFromLine(headerField, line);
              try {
                  // Otherwise add the key and value to the document
                  return (0, doc_path_1.setPath)(document, headerField.value, value);
              }
              catch (error) {
                  // Catch any errors where key paths are null or '' and continue
                  return document;
              }
          }, {});
      }
      /**
       * Removes the outermost wrap delimiters from a value, if they are present
       * Otherwise, the non-wrapped value is returned as is
       */
      function removeWrapDelimitersFromValue(fieldValue) {
          const firstChar = fieldValue[0], lastIndex = fieldValue.length - 1, lastChar = fieldValue[lastIndex];
          // If the field starts and ends with a wrap delimiter
          if (firstChar === options.delimiter.wrap && lastChar === options.delimiter.wrap) {
              // Handle the case where the field is just a pair of wrap delimiters 
              return fieldValue.length <= 2 ? '' : fieldValue.substring(1, lastIndex);
          }
          return fieldValue;
      }
      /**
       * Unescapes wrap delimiters by replacing duplicates with a single (eg. "" -> ")
       * This is done in order to parse RFC 4180 compliant CSV back to JSON
       */
      function unescapeWrapDelimiterInField(fieldValue) {
          return fieldValue.replace(escapedWrapDelimiterRegex, options.delimiter.wrap);
      }
      /**
       * Main helper function to convert the CSV to the JSON document array
       */
      function transformRecordLines(params) {
          // For each line, create the document and add it to the array of documents
          return params.recordLines.reduce((generatedJsonObjects, line) => {
              line = line.map((fieldValue) => {
                  // Perform the necessary operations on each line
                  fieldValue = removeWrapDelimitersFromValue(fieldValue);
                  fieldValue = unescapeWrapDelimiterInField(fieldValue);
                  fieldValue = trimRecordValue(fieldValue);
                  return fieldValue;
              });
              const generatedDocument = createDocument(params.headerFields, line);
              return generatedJsonObjects.concat(generatedDocument);
          }, []);
      }
      /**
       * Attempts to parse the provided value. If it is not parsable, then an error is returned
       */
      function parseValue(value) {
          try {
              if (utils.isStringRepresentation(value, options) && !utils.isDateRepresentation(value)) {
                  return value;
              }
              const parsedJson = valueParserFn(value);
              // If the parsed value is an array, then we also need to trim record values, if specified
              if (Array.isArray(parsedJson)) {
                  return parsedJson.map(trimRecordValue);
              }
              return parsedJson;
          }
          catch (err) {
              return err;
          }
      }
      /**
       * Internally exported csv2json function
       */
      function convert(data) {
          // Split the CSV into lines using the specified EOL option
          const stripped = stripExcelBOM(data);
          const split = splitLines(stripped);
          const heading = retrieveHeading(split); // Retrieve the headings from the CSV, unless the user specified the keys
          const lines = retrieveRecordLines(heading); // Retrieve the record lines from the CSV
          return transformRecordLines(lines); // Retrieve the JSON document array
      }
      return {
          convert,
      };
  };
  csv2json$1.Csv2Json = Csv2Json;

  Object.defineProperty(converter, "__esModule", { value: true });
  converter.csv2json = json2csv_2 = converter.json2csv = void 0;
  const constants_1 = constants;
  const json2csv_1 = json2csv$1;
  const csv2json_1 = csv2json$1;
  const utils_1 = utils$2;
  function json2csv(data, options) {
      const builtOptions = (0, utils_1.buildJ2COptions)(options ?? {});
      // Validate the parameters before calling the converter's convert function
      (0, utils_1.validate)(data, utils_1.isObject, constants_1.errors.json2csv);
      return (0, json2csv_1.Json2Csv)(builtOptions).convert(data);
  }
  var json2csv_2 = converter.json2csv = json2csv;
  function csv2json(data, options) {
      const builtOptions = (0, utils_1.buildC2JOptions)(options ?? {});
      // Validate the parameters before calling the converter's convert function
      (0, utils_1.validate)(data, utils_1.isString, constants_1.errors.csv2json);
      return (0, csv2json_1.Csv2Json)(builtOptions).convert(data);
  }
  converter.csv2json = csv2json;

  const ExportButton = props => {
    const {
      resource
    } = props;
    const addNotice = adminjs.useNotice();
    const {
      records
    } = adminjs.useRecords(resource.id);
    const handleClick = async () => {
      try {
        if (records && records.length > 0) {
          const result = records.map((record, index) => {
            const item = record.params;
            const memberObject = {
              ...item
            };
            delete memberObject._id;
            return {
              SN: index + 1,
              "Full Name": `${item.first_name} ${item.last_name}`,
              ...memberObject
            };
          });
          const csv = json2csv_2(result);
          const utf8Bom = "\uFEFF";
          const csvWithBom = utf8Bom + csv;
          const now = new Date();
          const formattedDate = now.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }).replace(/\D/g, "_");
          const formattedTime = now.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
          }).replace(/\D/g, "_");
          const fileName = `export_${formattedDate}_time_${formattedTime}.csv`;

          // Create a Blob from the CSV data
          const blob = new Blob([csvWithBom], {
            type: "text/csv;charset=utf-8;"
          });

          // Create a link element, hide it, direct it towards the blob, and then trigger a click
          const link = document.createElement("a");
          if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          addNotice({
            message: "Export successful",
            type: "success"
          });
        } else {
          addNotice({
            message: "No data found in the collection. Skipping CSV generation.",
            type: "info"
          });
        }
      } catch (error) {
        console.error("Export failed:", error);
        addNotice({
          message: "Export failed",
          type: "error"
        });
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleClick
    }, "Export CSV");
  };

  const Edit = ({ property, record, onChange }) => {
      const { translateProperty } = adminjs.useTranslation();
      const { params } = record;
      const { custom } = property;
      const path = adminjs.flat.get(params, custom.filePathProperty);
      const key = adminjs.flat.get(params, custom.keyProperty);
      const file = adminjs.flat.get(params, custom.fileProperty);
      const [originalKey, setOriginalKey] = React.useState(key);
      const [filesToUpload, setFilesToUpload] = React.useState([]);
      React.useEffect(() => {
          // it means means that someone hit save and new file has been uploaded
          // in this case fliesToUpload should be cleared.
          // This happens when user turns off redirect after new/edit
          if ((typeof key === 'string' && key !== originalKey)
              || (typeof key !== 'string' && !originalKey)
              || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
              setOriginalKey(key);
              setFilesToUpload([]);
          }
      }, [key, originalKey]);
      const onUpload = (files) => {
          setFilesToUpload(files);
          onChange(custom.fileProperty, files);
      };
      const handleRemove = () => {
          onChange(custom.fileProperty, null);
      };
      const handleMultiRemove = (singleKey) => {
          const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
          const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
          if (path && path.length > 0) {
              const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
              let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
              newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
              onChange({
                  ...record,
                  params: newParams,
              });
          }
          else {
              // eslint-disable-next-line no-console
              console.log('You cannot remove file when there are no uploaded files yet');
          }
      };
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                  mimeTypes: custom.mimeTypes,
                  maxSize: custom.maxSize,
              }, files: filesToUpload }),
          !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
          custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
              // when we remove items we set only path index to nulls.
              // key is still there. This is because
              // we have to maintain all the indexes. So here we simply filter out elements which
              // were removed and display only what was left
              const currentPath = path[index];
              return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
          }))) : ''));
  };

  const AudioMimeTypes = [
      'audio/aac',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'application/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'audio/3gpp2',
  ];
  const ImageMimeTypes = [
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/vnd.microsoft.icon',
      'image/tiff',
      'image/webp',
  ];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = (props) => {
      const { name, path, mimeType, width } = props;
      if (path && path.length) {
          if (mimeType && ImageMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
          }
          if (mimeType && AudioMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("audio", { controls: true, src: path },
                  "Your browser does not support the",
                  React__default.default.createElement("code", null, "audio"),
                  React__default.default.createElement("track", { kind: "captions" })));
          }
      }
      return (React__default.default.createElement(designSystem.Box, null,
          React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
              React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
              name)));
  };
  const File = ({ width, record, property }) => {
      const { custom } = property;
      let path = adminjs.flat.get(record?.params, custom.filePathProperty);
      if (!path) {
          return null;
      }
      const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
      const mimeType = custom.mimeTypeProperty
          && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
      if (!property.custom.multiple) {
          if (custom.opts && custom.opts.baseUrl) {
              path = `${custom.opts.baseUrl}/${name}`;
          }
          return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
      }
      if (custom.opts && custom.opts.baseUrl) {
          const baseUrl = custom.opts.baseUrl || '';
          path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
      }
      return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
  };

  const List = (props) => (React__default.default.createElement(File, { width: 100, ...props }));

  const Show = (props) => {
      const { property } = props;
      const { translateProperty } = adminjs.useTranslation();
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(File, { width: "100%", ...props })));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.ApproveMember = ApproveMember;
  AdminJS.UserComponents.RejectMember = RejectMember;
  AdminJS.UserComponents.ExportButton = ExportButton;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vYXBpL0FwcHJvdmVNZW1iZXIudHN4IiwiLi4vYXBpL1JlamVjdE1lbWJlci50c3giLCIuLi9ub2RlX21vZHVsZXMvanNvbi0yLWNzdi9saWIvY29uc3RhbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RvYy1wYXRoL2xpYi9wYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RlZWtzL2xpYi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kZWVrcy9saWIvdHlwZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVla3MvbGliL2RlZWtzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL2pzb24yY3N2LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL2NzdjJqc29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL2NvbnZlcnRlci5qcyIsIi4uL2FwaS9FeHBvcnRCdXR0b24uanN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL3R5cGVzL21pbWUtdHlwZXMudHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUpO1xuICB9IDogZW5jb2RlO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGNvbnN0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgdGltZXIgPSBudWxsO1xuICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIGNvbnN0IGZvcmNlID0gdGhpcyA9PT0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKGZvcmNlIHx8IG5vdyAtIHRpbWVzdGFtcCA+IHRocmVzaG9sZCkge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpZiAoIXRpbWVyKSB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSwgdGhyZXNob2xkIC0gKG5vdyAtIHRpbWVzdGFtcCkpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0cyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICBsZXQgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHByb2dyZXNzRXZlbnRSZWR1Y2VyIGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBsZXQge3Jlc3BvbnNlVHlwZX0gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIF9jb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBfY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBfY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBfY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKF9jb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIF9jb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihfY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICBsZXQgYWJvcnRlZDtcblxuICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKGNhbmNlbCkge1xuICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgY29uc3QgZXJyID0gY2FuY2VsIGluc3RhbmNlb2YgRXJyb3IgPyBjYW5jZWwgOiB0aGlzLnJlYXNvbjtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvciA/IGVyciA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgfSwgdGltZW91dClcblxuICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICBpZiAoc2lnbmFscykge1xuICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICBzaWduYWwgJiZcbiAgICAgICAgKHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyID8gc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkgOiBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkpO1xuICAgICAgfSk7XG4gICAgICBzaWduYWxzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG5cbiAgcmV0dXJuIFtzaWduYWwsICgpID0+IHtcbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgfV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgdHlwZTogJ2J5dGVzJyxcblxuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGJ5dGVzICs9IGxlbik7XG4gICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIG9uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gXCIuLi9wbGF0Zm9ybS9pbmRleC5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gXCIuLi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzXCI7XG5pbXBvcnQge3RyYWNrU3RyZWFtfSBmcm9tIFwiLi4vaGVscGVycy90cmFja1N0cmVhbS5qc1wiO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi4vY29yZS9BeGlvc0hlYWRlcnMuanNcIjtcbmltcG9ydCBwcm9ncmVzc0V2ZW50UmVkdWNlciBmcm9tIFwiLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qc1wiO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuaW1wb3J0IHNldHRsZSBmcm9tIFwiLi4vY29yZS9zZXR0bGUuanNcIjtcblxuY29uc3QgZmV0Y2hQcm9ncmVzc0RlY29yYXRvciA9ICh0b3RhbCwgZm4pID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG4gIHJldHVybiAobG9hZGVkKSA9PiBzZXRUaW1lb3V0KCgpID0+IGZuKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSk7XG59XG5cbmNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgdHlwZW9mIFJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXG4vLyB1c2VkIG9ubHkgaW5zaWRlIHRoZSBmZXRjaCBhZGFwdGVyXG5jb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAoKGVuY29kZXIpID0+IChzdHIpID0+IGVuY29kZXIuZW5jb2RlKHN0cikpKG5ldyBUZXh0RW5jb2RlcigpKSA6XG4gICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlc3BvbnNlKHN0cikuYXJyYXlCdWZmZXIoKSlcbik7XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgKCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pKCk7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgISEoKCk9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KTtcbiAgfSBjYXRjaChlcnIpIHtcbiAgICAvLyByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn0pKCk7XG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMuaXNGdW5jdGlvbihyZXNbdHlwZV0pID8gKHJlcykgPT4gcmVzW3R5cGVdKCkgOlxuICAgICAgKF8sIGNvbmZpZykgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cblxuICBpZih1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBuZXcgUmVxdWVzdChib2R5KS5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICBib2R5ID0gYm9keSArICcnO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn1cblxuY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgW2NvbXBvc2VkU2lnbmFsLCBzdG9wVGltZW91dF0gPSAoc2lnbmFsIHx8IGNhbmNlbFRva2VuIHx8IHRpbWVvdXQpID9cbiAgICBjb21wb3NlU2lnbmFscyhbc2lnbmFsLCBjYW5jZWxUb2tlbl0sIHRpbWVvdXQpIDogW107XG5cbiAgbGV0IGZpbmlzaGVkLCByZXF1ZXN0O1xuXG4gIGNvbnN0IG9uRmluaXNoID0gKCkgPT4ge1xuICAgICFmaW5pc2hlZCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG5cbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gIH1cblxuICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICBvblVwbG9hZFByb2dyZXNzICYmIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICApIHtcbiAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIlxuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpXG4gICAgICAgICksIG51bGwsIGVuY29kZVRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2NvcnMnIDogJ29taXQnO1xuICAgIH1cblxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgd2l0aENyZWRlbnRpYWxzXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcblxuICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICBpZiAoc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAob25Eb3dubG9hZFByb2dyZXNzIHx8IGlzU3RyZWFtUmVzcG9uc2UpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uRG93bmxvYWRQcm9ncmVzcyAmJiBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpXG4gICAgICAgICksIGlzU3RyZWFtUmVzcG9uc2UgJiYgb25GaW5pc2gsIGVuY29kZVRleHQpLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuXG4gICAgc3RvcFRpbWVvdXQgJiYgc3RvcFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgb25GaW5pc2goKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS43LjJcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBCb3gsIEZvcm1Hcm91cCwgTGFiZWwsIElucHV0LCBCdXR0b24gfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IEFjdGlvblByb3BzIH0gZnJvbSBcImFkbWluanNcIjtcclxuXHJcbmNvbnN0IEFwcHJvdmVNZW1iZXIgPSAocHJvcHM6IEFjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgYXBpX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQgYXMgSFRNTEZvcm1FbGVtZW50KTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcImlzQXBwcm92ZWRcIiwgXCJ0cnVlXCIpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLnB1dChcclxuICAgICAgICBgJHthcGlfdXJsfS9hcGkvbWVtYmVycy8ke3JlY29yZD8ucGFyYW1zLl9pZH1gLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGNlcnRpZmljYXRlID0gcmVzLmRhdGEubWVtYmVyc2hpcF9jZXJ0aWZpY2F0ZTtcclxuICAgICAgY29uc3QgY2VydGlmaWNhdGVVcmwgPSBgJHthcGlfdXJsfS91cGxvYWRzLyR7Y2VydGlmaWNhdGV9YDtcclxuXHJcbiAgICAgIGNvbnN0IGVtYWlsRGF0YSA9IHtcclxuICAgICAgICB0bzogcmVjb3JkPy5wYXJhbXMuZW1haWwsXHJcbiAgICAgICAgc3ViamVjdDogXCJNZW1iZXJzaGlwIEFwcHJvdmVkXCIsXHJcbiAgICAgICAgdGV4dDogYENvbmdyYXR1bGF0aW9ucyEgWW91ciBtZW1iZXJzaGlwIGhhcyBiZWVuIGFwcHJvdmVkLiBZb3UgY2FuIGRvd25sb2FkIHlvdXIgY2VydGlmaWNhdGUgZnJvbSB0aGUgZm9sbG93aW5nIGxpbms6ICR7Y2VydGlmaWNhdGVVcmx9YCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGF3YWl0IGF4aW9zLnBvc3QoYCR7YXBpX3VybH0vYXBpL21lbWJlcnMvc2VuZC1lbWFpbGAsIGVtYWlsRGF0YSk7XHJcblxyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FkbWluL3Jlc291cmNlcy9NZW1iZXJcIjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFwcHJvdmUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKFwiaXNBcHByb3ZlZFwiLCBcInRydWVcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MucG9zdChcclxuICAgICAgICBgJHthcGlfdXJsfS9hZG1pbi9hcGkvcmVzb3VyY2VzLyR7cmVzb3VyY2UuaWR9L3JlY29yZHMvJHtyZWNvcmQ/LnBhcmFtcy5faWR9L2VkaXRgLFxyXG4gICAgICAgIGZvcm1EYXRhXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IHJlcy5kYXRhLnJlY29yZC5wYXJhbXMubWVtYmVyc2hpcF9jZXJ0aWZpY2F0ZTtcclxuICAgICAgY29uc3QgY2VydGlmaWNhdGVVcmwgPSBgJHthcGlfdXJsfS91cGxvYWRzLyR7Y2VydGlmaWNhdGV9YDtcclxuXHJcbiAgICAgIGNvbnN0IGVtYWlsRGF0YSA9IHtcclxuICAgICAgICB0bzogcmVjb3JkPy5wYXJhbXMuZW1haWwsXHJcbiAgICAgICAgc3ViamVjdDogXCJNZW1iZXJzaGlwIEFwcHJvdmVkXCIsXHJcbiAgICAgICAgdGV4dDogYENvbmdyYXR1bGF0aW9ucyEgWW91ciBtZW1iZXJzaGlwIGhhcyBiZWVuIGFwcHJvdmVkLiBZb3UgY2FuIGRvd25sb2FkIHlvdXIgY2VydGlmaWNhdGUgZnJvbSB0aGUgZm9sbG93aW5nIGxpbms6ICR7Y2VydGlmaWNhdGVVcmx9YCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGF3YWl0IGF4aW9zLnBvc3QoYCR7YXBpX3VybH0vYXBpL21lbWJlcnMvc2VuZC1lbWFpbGAsIGVtYWlsRGF0YSk7XHJcblxyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlcy5kYXRhLnJlZGlyZWN0VXJsO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiB3aWR0aD17MSAvIDJ9IHA9XCJsZ1wiIG09XCJhdXRvXCIgbXQ9XCJ4eGxcIj5cclxuICAgICAge3JlY29yZD8ucGFyYW1zLmlzTmV3ID8gKFxyXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJtZW1iZXJzaGlwX251bWJlclwiPk1lbWJlcnNoaXAgTnVtYmVyPC9MYWJlbD5cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgaWQ9XCJtZW1iZXJzaGlwX251bWJlclwiXHJcbiAgICAgICAgICAgICAgbmFtZT1cIm1lbWJlcnNoaXBfbnVtYmVyXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIG1lbWJlcnNoaXAgbnVtYmVyXCJcclxuICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJtZW1iZXJzaGlwX2NlcnRpZmljYXRlXCI+XHJcbiAgICAgICAgICAgICAgTWVtYmVyc2hpcCBDZXJ0aWZpY2F0ZVxyXG4gICAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICBpZD1cIm1lbWJlcnNoaXBfY2VydGlmaWNhdGVcIlxyXG4gICAgICAgICAgICAgIG5hbWU9XCJtZW1iZXJzaGlwX2NlcnRpZmljYXRlXCJcclxuICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKiwgYXBwbGljYXRpb24vcGRmXCJcclxuICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgbXQ9XCJtZFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgU3VibWl0XHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG10PVwibWRcIiBvbkNsaWNrPXtoYW5kbGVBcHByb3ZlfT5cclxuICAgICAgICAgIENvbmZpcm0gQXBwcm92ZVxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICApfVxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcHJvdmVNZW1iZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBCb3gsXHJcbiAgRm9ybUdyb3VwLFxyXG4gIExhYmVsLFxyXG4gIFRleHRBcmVhLFxyXG4gIEJ1dHRvbixcclxufSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25Qcm9wcyB9IGZyb20gXCJhZG1pbmpzXCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuXHJcbmNvbnN0IFJlamVjdE1lbWJlciA9IChwcm9wczogQWN0aW9uUHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzO1xyXG5cclxuICBjb25zdCBhcGlfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBheGlvc1xyXG4gICAgICAucG9zdChcclxuICAgICAgICBgJHthcGlfdXJsfS9hZG1pbi9hcGkvcmVzb3VyY2VzLyR7cmVzb3VyY2UuaWR9L3JlY29yZHMvJHtyZWNvcmQ/LnBhcmFtcy5faWR9L2RlbGV0ZWBcclxuICAgICAgKVxyXG4gICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHthcGlfdXJsfS9hZG1pbi9yZXNvdXJjZXMvJHtyZXNvdXJjZS5pZH1gO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiB3aWR0aD17MSAvIDJ9IHA9XCJsZ1wiIG09XCJhdXRvXCIgbXQ9XCJ4eGxcIj5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwicmVqZWN0aW9uX21lc3NhZ2VcIj5SZWplY3Rpb24gTWVzc2FnZTwvTGFiZWw+XHJcbiAgICAgICAgICA8VGV4dEFyZWFcclxuICAgICAgICAgICAgaWQ9XCJyZWplY3Rpb25fbWVzc2FnZVwiXHJcbiAgICAgICAgICAgIG5hbWU9XCJyZWplY3Rpb25fbWVzc2FnZVwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcmVqZWN0aW9uIG1lc3NhZ2VcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgbXQ9XCJtZFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICAgIFN1Ym1pdFxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVqZWN0TWVtYmVyO1xyXG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4Y2VsQk9NID0gZXhwb3J0cy5kZWZhdWx0Q3N2Mkpzb25PcHRpb25zID0gZXhwb3J0cy5kZWZhdWx0SnNvbjJDc3ZPcHRpb25zID0gZXhwb3J0cy5lcnJvcnMgPSB2b2lkIDA7XG5leHBvcnRzLmVycm9ycyA9IHtcbiAgICBvcHRpb25zUmVxdWlyZWQ6ICdPcHRpb25zIHdlcmUgbm90IHBhc3NlZCBhbmQgYXJlIHJlcXVpcmVkLicsXG4gICAganNvbjJjc3Y6IHtcbiAgICAgICAgY2Fubm90Q2FsbE9uOiAnQ2Fubm90IGNhbGwganNvbjJjc3Ygb24nLFxuICAgICAgICBkYXRhQ2hlY2tGYWlsdXJlOiAnRGF0YSBwcm92aWRlZCB3YXMgbm90IGFuIGFycmF5IG9mIGRvY3VtZW50cy4nLFxuICAgICAgICBub3RTYW1lU2NoZW1hOiAnTm90IGFsbCBkb2N1bWVudHMgaGF2ZSB0aGUgc2FtZSBzY2hlbWEuJ1xuICAgIH0sXG4gICAgY3N2Mmpzb246IHtcbiAgICAgICAgY2Fubm90Q2FsbE9uOiAnQ2Fubm90IGNhbGwgY3N2Mmpzb24gb24nLFxuICAgICAgICBkYXRhQ2hlY2tGYWlsdXJlOiAnQ1NWIGlzIG5vdCBhIHN0cmluZy4nXG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdEpzb24yQ3N2T3B0aW9ucyA9IHtcbiAgICBhcnJheUluZGV4ZXNBc0tleXM6IGZhbHNlLFxuICAgIGNoZWNrU2NoZW1hRGlmZmVyZW5jZXM6IGZhbHNlLFxuICAgIGRlbGltaXRlcjoge1xuICAgICAgICBmaWVsZDogJywnLFxuICAgICAgICB3cmFwOiAnXCInLFxuICAgICAgICBlb2w6ICdcXG4nXG4gICAgfSxcbiAgICBlbXB0eUZpZWxkVmFsdWU6IHVuZGVmaW5lZCxcbiAgICBlc2NhcGVIZWFkZXJOZXN0ZWREb3RzOiB0cnVlLFxuICAgIGV4Y2VsQk9NOiBmYWxzZSxcbiAgICBleGNsdWRlS2V5czogW10sXG4gICAgZXhwYW5kTmVzdGVkT2JqZWN0czogdHJ1ZSxcbiAgICBleHBhbmRBcnJheU9iamVjdHM6IGZhbHNlLFxuICAgIHByZXBlbmRIZWFkZXI6IHRydWUsXG4gICAgcHJldmVudENzdkluamVjdGlvbjogZmFsc2UsXG4gICAgc29ydEhlYWRlcjogZmFsc2UsXG4gICAgdHJpbUZpZWxkVmFsdWVzOiBmYWxzZSxcbiAgICB0cmltSGVhZGVyRmllbGRzOiBmYWxzZSxcbiAgICB1bndpbmRBcnJheXM6IGZhbHNlLFxuICAgIHVzZURhdGVJc284NjAxRm9ybWF0OiBmYWxzZSxcbiAgICB1c2VMb2NhbGVGb3JtYXQ6IGZhbHNlLFxuICAgIHdyYXBCb29sZWFuczogZmFsc2UsXG59O1xuZXhwb3J0cy5kZWZhdWx0Q3N2Mkpzb25PcHRpb25zID0ge1xuICAgIGRlbGltaXRlcjoge1xuICAgICAgICBmaWVsZDogJywnLFxuICAgICAgICB3cmFwOiAnXCInLFxuICAgICAgICBlb2w6ICdcXG4nXG4gICAgfSxcbiAgICBleGNlbEJPTTogZmFsc2UsXG4gICAgcHJldmVudENzdkluamVjdGlvbjogZmFsc2UsXG4gICAgdHJpbUZpZWxkVmFsdWVzOiBmYWxzZSxcbiAgICB0cmltSGVhZGVyRmllbGRzOiBmYWxzZSxcbn07XG5leHBvcnRzLmV4Y2VsQk9NID0gJ1xcdWZlZmYnO1xuIiwiLyoqXG4gKiBAbGljZW5zZSBNSVRcbiAqIGRvYy1wYXRoIDxodHRwczovL2dpdGh1Yi5jb20vbXJvZHJpZy9kb2MtcGF0aD5cbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBNaWNoYWVsIFJvZHJpZ3Vlcy5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRQYXRoID0gZXhwb3J0cy5ldmFsdWF0ZVBhdGggPSB2b2lkIDA7XG4vKipcbiAqIE1haW4gZnVuY3Rpb24gdGhhdCBldmFsdWF0ZXMgdGhlIHBhdGggaW4gYSBwYXJ0aWN1bGFyIG9iamVjdFxuICogQHRocm93cyB7RXJyb3J9IHBvc3NpYmxlIGVycm9yIGlmIGNhbGwgc3RhY2sgc2l6ZSBpcyBleGNlZWRlZFxuICovXG5mdW5jdGlvbiBldmFsdWF0ZVBhdGgob2JqLCBrcCkge1xuICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7IGRvdEluZGV4LCBrZXksIHJlbWFpbmluZyB9ID0gc3RhdGUoa3ApO1xuICAgIGNvbnN0IGtwVmFsID0gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYga3AgaW4gb2JqID8gb2JqW2twXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBrZXlWYWwgPSB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBrZXkgaW4gb2JqID8gb2JqW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgaWYgKGRvdEluZGV4ID49IDAgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIShrcCBpbiBvYmopKSB7XG4gICAgICAgIGNvbnN0IHsga2V5OiBuZXh0S2V5IH0gPSBzdGF0ZShyZW1haW5pbmcpO1xuICAgICAgICBjb25zdCBuZXh0S2V5QXNJbnQgPSBwYXJzZUludChuZXh0S2V5KTtcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhbiBhcnJheSBhdCB0aGUgY3VycmVudCBrZXkgaW4gdGhlIG9iamVjdCwgdGhlbiBpdGVyYXRlIG92ZXIgdGhvc2UgaXRlbXMgZXZhbHVhdGluZyB0aGUgcmVtYWluaW5nIHBhdGhcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5VmFsKSAmJiBpc05hTihuZXh0S2V5QXNJbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5VmFsLm1hcCgoZG9jKSA9PiBldmFsdWF0ZVBhdGgoZG9jLCByZW1haW5pbmcpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGNhbiBqdXN0IHJlY3VyXG4gICAgICAgIHJldHVybiBldmFsdWF0ZVBhdGgoa2V5VmFsLCByZW1haW5pbmcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgY29uc3Qga2V5QXNJbnQgPSBwYXJzZUludChrZXkpO1xuICAgICAgICBpZiAoa3AgPT09IGtleSAmJiBkb3RJbmRleCA9PT0gLTEgJiYgIWlzTmFOKGtleUFzSW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleVZhbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGlzIG9iamVjdCBpcyBhY3R1YWxseSBhbiBhcnJheSwgdGhlbiBpdGVyYXRlIG92ZXIgdGhvc2UgaXRlbXMgZXZhbHVhdGluZyB0aGUgcGF0aFxuICAgICAgICByZXR1cm4gb2JqLm1hcCgoZG9jKSA9PiBldmFsdWF0ZVBhdGgoZG9jLCBrcCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb3RJbmRleCA+PSAwICYmIGtwICE9PSBrZXkgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYga2V5IGluIG9iaikge1xuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgZmllbGQgd2l0aCBhIG5vbi1uZXN0ZWQgZG90LCB0aGVuIHJlY3VyIGludG8gdGhhdCBzdWItdmFsdWVcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlUGF0aChrZXlWYWwsIHJlbWFpbmluZyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvdEluZGV4ID09PSAtMSAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBrZXkgaW4gb2JqICYmICEoa3AgaW4gb2JqKSkge1xuICAgICAgICAvLyBJZiB0aGUgZmllbGQgaXMgaGVyZSwgYnV0IHRoZSBrZXkgd2FzIGVzY2FwZWRcbiAgICAgICAgcmV0dXJuIGtleVZhbDtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCB3ZSBjYW4ganVzdCByZXR1cm4gdmFsdWUgZGlyZWN0bHlcbiAgICByZXR1cm4ga3BWYWw7XG59XG5leHBvcnRzLmV2YWx1YXRlUGF0aCA9IGV2YWx1YXRlUGF0aDtcbi8qKlxuICogTWFpbiBmdW5jdGlvbiB0aGF0IHBlcmZvcm1zIHZhbGlkYXRpb24gYmVmb3JlIHBhc3Npbmcgb2ZmIHRvIF9zcFxuICogQHRocm93cyB7RXJyb3J9IHBvc3NpYmxlIGVycm9yIGlmIGNhbGwgc3RhY2sgc2l6ZSBpcyBleGNlZWRlZFxuICovXG5mdW5jdGlvbiBzZXRQYXRoKG9iaiwga3AsIHYpIHtcbiAgICBpZiAoIW9iaikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG9iamVjdCB3YXMgcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFrcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGtleVBhdGggd2FzIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gX3NwKG9iaiwga3AsIHYpO1xufVxuZXhwb3J0cy5zZXRQYXRoID0gc2V0UGF0aDtcbi8vIEhlbHBlciBmdW5jdGlvbiB0aGF0IHdpbGwgc2V0IHRoZSB2YWx1ZSBpbiB0aGUgcHJvdmlkZWQgb2JqZWN0L2FycmF5LlxuZnVuY3Rpb24gX3NwKG9iaiwga3AsIHYpIHtcbiAgICBjb25zdCB7IGRvdEluZGV4LCBrZXksIHJlbWFpbmluZyB9ID0gc3RhdGUoa3ApO1xuICAgIC8vIElmIHRoaXMgaXMgY2xlYXJseSBhIHByb3RvdHlwZSBwb2xsdXRpb24gYXR0ZW1wdCwgdGhlbiByZWZ1c2UgdG8gbW9kaWZ5IHRoZSBwYXRoXG4gICAgaWYgKGtwLnN0YXJ0c1dpdGgoJ19fcHJvdG9fXycpIHx8IGtwLnN0YXJ0c1dpdGgoJ2NvbnN0cnVjdG9yJykgfHwga3Auc3RhcnRzV2l0aCgncHJvdG90eXBlJykpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKGRvdEluZGV4ID49IDApIHtcbiAgICAgICAgY29uc3Qga2V5QXNJbnQgPSBwYXJzZUludChrZXkpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhICcuJyBpbiB0aGUga2V5IHBhdGgsIHJlY3VyIG9uIHRoZSBzdWJkb2MgYW5kIC4uLlxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsICYmICEoa2V5IGluIG9iaikgJiYgQXJyYXkuaXNBcnJheShvYmopICYmICFpc05hTihrZXlBc0ludCkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gdmFsdWUgYXQgb2JqW2tleV0gdGhlbiBwb3B1bGF0ZSBhbiBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIG9ialtrZXldID0gb2JqW2tleV0gPz8ge307XG4gICAgICAgICAgICAvLyBDb250aW51ZSBpdGVyYXRpbmcgb24gdGhlIHJlc3Qgb2YgdGhlIGtleSBwYXRoIHRvIHNldCB0aGUgYXBwcm9wcmlhdGUgdmFsdWUgd2hlcmUgaW50ZW5kZWQgYW5kIHRoZW4gcmV0dXJuXG4gICAgICAgICAgICBfc3Aob2JqW2tleV0sIHJlbWFpbmluZywgdik7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCAmJiAhKGtleSBpbiBvYmopICYmIEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBhcnJheSBhbmQgdGhlcmUgYXJlIG11bHRpcGxlIGxldmVscyBvZiBrZXlzIHRvIGl0ZXJhdGUgb3ZlciwgcmVjdXIuXG4gICAgICAgICAgICBvYmouZm9yRWFjaCgoZG9jKSA9PiBfc3AoZG9jLCBrcCwgdikpO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwgJiYgIShrZXkgaW4gb2JqKSAmJiAhQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBjb25zdCB7IGtleTogbmV4dEtleSB9ID0gc3RhdGUocmVtYWluaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRLZXlBc0ludCA9IHBhcnNlSW50KG5leHRLZXkpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihuZXh0S2V5QXNJbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQga2V5IGRvZXNuJ3QgZXhpc3QgeWV0IGFuZCB0aGUgbmV4dCBrZXkgaXMgYSBudW1iZXIgKGxpa2VseSBhcnJheSBpbmRleCksIHBvcHVsYXRlIGFuIGVtcHR5IGFycmF5XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJlbWFpbmluZyA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmVtYWluaW5nIGtleSBpcyBlbXB0eSwgdGhlbiBhIGAuYCBjaGFyYWN0ZXIgYXBwZWFyZWQgcmlnaHQgYXQgdGhlIGVuZCBvZiB0aGUgcGF0aCBhbmQgd2Fzbid0IGFjdHVhbGx5IGluZGljYXRpbmcgYSBzZXBhcmF0ZSBsZXZlbFxuICAgICAgICAgICAgICAgIG9ialtrcF0gPSB2O1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBrZXkgZG9lc24ndCBleGlzdCB5ZXQsIHBvcHVsYXRlIGl0XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfc3Aob2JqW2tleV0sIHJlbWFpbmluZywgdik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBjb25zdCBrZXlBc0ludCA9IHBhcnNlSW50KGtleSk7XG4gICAgICAgIC8vIElmIHRoZSBvYmplY3QgaXMgYW4gYXJyYXkgYW5kIHRoaXMga2V5IGlzIGFuIGludCAobGlrZWx5IGFycmF5IGluZGV4KSwgdGhlbiBzZXQgdGhlIHZhbHVlIGRpcmVjdGx5IGFuZCByZXR1cm5cbiAgICAgICAgaWYgKGtwID09PSBrZXkgJiYgZG90SW5kZXggPT09IC0xICYmICFpc05hTihrZXlBc0ludCkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdjtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhpcyBcIm9ialwiIGlzIGFjdHVhbGx5IGFuIGFycmF5LCB0aGVuIHdlIGNhbiBsb29wIG92ZXIgZWFjaCBvZiB0aGUgdmFsdWVzIGFuZCBzZXQgdGhlIHBhdGhcbiAgICAgICAgb2JqLmZvckVhY2goKGRvYykgPT4gX3NwKGRvYywgcmVtYWluaW5nLCB2KSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGNhbiBzZXQgdGhlIHBhdGggZGlyZWN0bHlcbiAgICAgICAgb2JqW2tleV0gPSB2O1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBzb21lIGluZm9ybWF0aW9uIG5lY2Vzc2FyeSB0byBldmFsdWF0ZSBvciBzZXQgYSBwYXRoICBiYXNlZCBvbiB0aGUgcHJvdmlkZWQga2V5UGF0aCB2YWx1ZVxuZnVuY3Rpb24gc3RhdGUoa3ApIHtcbiAgICBjb25zdCBkb3RJbmRleCA9IGZpbmRGaXJzdE5vbkVzY2FwZWREb3RJbmRleChrcCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZG90SW5kZXgsXG4gICAgICAgIGtleToga3Auc2xpY2UoMCwgZG90SW5kZXggPj0gMCA/IGRvdEluZGV4IDogdW5kZWZpbmVkKS5yZXBsYWNlKC9cXFxcLi9nLCAnLicpLFxuICAgICAgICByZW1haW5pbmc6IGtwLnNsaWNlKGRvdEluZGV4ICsgMSlcbiAgICB9O1xufVxuZnVuY3Rpb24gZmluZEZpcnN0Tm9uRXNjYXBlZERvdEluZGV4KGtwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcmV2aW91c0NoYXIgPSBpID4gMCA/IGtwW2kgLSAxXSA6ICcnLCBjdXJyZW50Q2hhciA9IGtwW2ldO1xuICAgICAgICBpZiAoY3VycmVudENoYXIgPT09ICcuJyAmJiBwcmV2aW91c0NoYXIgIT09ICdcXFxcJylcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzRG9jdW1lbnRUb1JlY3VyT24gPSBleHBvcnRzLmZsYXR0ZW4gPSBleHBvcnRzLnVuaXF1ZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIHVuaXF1ZShhcnJheSkge1xuICAgIHJldHVybiBbLi4ubmV3IFNldChhcnJheSldO1xufVxuZXhwb3J0cy51bmlxdWUgPSB1bmlxdWU7XG5mdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5hcnJheSk7XG59XG5leHBvcnRzLmZsYXR0ZW4gPSBmbGF0dGVuO1xuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhpcyB2YWx1ZSBpcyBhIGRvY3VtZW50IHRvIHJlY3VyIG9uIG9yIG5vdFxuICogQHBhcmFtIHZhbCBBbnkgaXRlbSB3aG9zZSB0eXBlIHdpbGwgYmUgZXZhbHVhdGVkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNEb2N1bWVudFRvUmVjdXJPbih2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHZhbCkgJiYgT2JqZWN0LmtleXModmFsKS5sZW5ndGg7XG59XG5leHBvcnRzLmlzRG9jdW1lbnRUb1JlY3VyT24gPSBpc0RvY3VtZW50VG9SZWN1ck9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWVwS2V5c0Zyb21MaXN0ID0gZXhwb3J0cy5kZWVwS2V5cyA9IHZvaWQgMDtcbmNvbnN0IHV0aWxzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3V0aWxzXCIpKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSwgZXhwb3J0cyk7XG4vKipcbiAqIFJldHVybiB0aGUgZGVlcCBrZXlzIGxpc3QgZm9yIGEgc2luZ2xlIGRvY3VtZW50XG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBkZWVwS2V5cyhvYmplY3QsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBwYXJzZWRPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRGVlcEtleXNMaXN0KCcnLCBvYmplY3QsIHBhcnNlZE9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG5leHBvcnRzLmRlZXBLZXlzID0gZGVlcEtleXM7XG4vKipcbiAqIFJldHVybiB0aGUgZGVlcCBrZXlzIGxpc3QgZm9yIGFsbCBkb2N1bWVudHMgaW4gdGhlIHByb3ZpZGVkIGxpc3RcbiAqIEBwYXJhbSBsaXN0XG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQHJldHVybnMgQXJyYXlbQXJyYXlbU3RyaW5nXV1cbiAqL1xuZnVuY3Rpb24gZGVlcEtleXNGcm9tTGlzdChsaXN0LCBvcHRpb25zKSB7XG4gICAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gbGlzdC5tYXAoKGRvY3VtZW50KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICdvYmplY3QnICYmIGRvY3VtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgZGF0YSBhdCB0aGUga2V5IGlzIGEgZG9jdW1lbnQsIHRoZW4gd2UgcmV0cmlldmUgdGhlIHN1YkhlYWRpbmcgc3RhcnRpbmcgd2l0aCBhbiBlbXB0eSBzdHJpbmcgaGVhZGluZyBhbmQgdGhlIGRvY1xuICAgICAgICAgICAgcmV0dXJuIGRlZXBLZXlzKGRvY3VtZW50LCBwYXJzZWRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZXBLZXlzRnJvbUxpc3QgPSBkZWVwS2V5c0Zyb21MaXN0O1xuZnVuY3Rpb24gZ2VuZXJhdGVEZWVwS2V5c0xpc3QoaGVhZGluZywgZGF0YSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGN1cnJlbnRLZXkpID0+IHtcbiAgICAgICAgLy8gSWYgdGhlIGdpdmVuIGhlYWRpbmcgaXMgZW1wdHksIHRoZW4gd2Ugc2V0IHRoZSBoZWFkaW5nIHRvIGJlIHRoZSBzdWJLZXksIG90aGVyd2lzZSBzZXQgaXQgYXMgYSBuZXN0ZWQgaGVhZGluZyB3LyBhIGRvdFxuICAgICAgICBjb25zdCBrZXlOYW1lID0gYnVpbGRLZXlOYW1lKGhlYWRpbmcsIGVzY2FwZU5lc3RlZERvdHNJZlNwZWNpZmllZChjdXJyZW50S2V5LCBvcHRpb25zKSk7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYW5vdGhlciBuZXN0ZWQgZG9jdW1lbnQsIHJlY3VyIG9uIHRoZSBzdWItZG9jdW1lbnQgdG8gcmV0cmlldmUgdGhlIGZ1bGwga2V5IG5hbWVcbiAgICAgICAgaWYgKG9wdGlvbnMuZXhwYW5kTmVzdGVkT2JqZWN0cyAmJiB1dGlscy5pc0RvY3VtZW50VG9SZWN1ck9uKGRhdGFbY3VycmVudEtleV0pIHx8IChvcHRpb25zLmFycmF5SW5kZXhlc0FzS2V5cyAmJiBBcnJheS5pc0FycmF5KGRhdGFbY3VycmVudEtleV0pICYmIGRhdGFbY3VycmVudEtleV0ubGVuZ3RoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlRGVlcEtleXNMaXN0KGtleU5hbWUsIGRhdGFbY3VycmVudEtleV0sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZXhwYW5kQXJyYXlPYmplY3RzICYmIEFycmF5LmlzQXJyYXkoZGF0YVtjdXJyZW50S2V5XSkpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBuZXN0ZWQgYXJyYXkgdGhhdCB3ZSBuZWVkIHRvIHJlY3VyIG9uXG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0FycmF5S2V5cyhkYXRhW2N1cnJlbnRLZXldLCBrZXlOYW1lLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmlnbm9yZUVtcHR5QXJyYXlzICYmIEFycmF5LmlzQXJyYXkoZGF0YVtjdXJyZW50S2V5XSkgJiYgIWRhdGFbY3VycmVudEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybiB0aGlzIGtleSBuYW1lIHNpbmNlIHdlIGRvbid0IGhhdmUgYSBzdWIgZG9jdW1lbnRcbiAgICAgICAgcmV0dXJuIGtleU5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHV0aWxzLmZsYXR0ZW4oa2V5cyk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIHByb2Nlc3Npbmcgb2YgYXJyYXlzIHdoZW4gdGhlIGV4cGFuZEFycmF5T2JqZWN0c1xuICogb3B0aW9uIGlzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBzdWJBcnJheVxuICogQHBhcmFtIGN1cnJlbnRLZXlQYXRoXG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NBcnJheUtleXMoc3ViQXJyYXksIGN1cnJlbnRLZXlQYXRoLCBvcHRpb25zKSB7XG4gICAgbGV0IHN1YkFycmF5S2V5cyA9IGRlZXBLZXlzRnJvbUxpc3Qoc3ViQXJyYXksIG9wdGlvbnMpO1xuICAgIGlmICghc3ViQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmlnbm9yZUVtcHR5QXJyYXlzV2hlbkV4cGFuZGluZyA/IFtdIDogW2N1cnJlbnRLZXlQYXRoXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViQXJyYXkubGVuZ3RoICYmIHV0aWxzLmZsYXR0ZW4oc3ViQXJyYXlLZXlzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gSGFzIGl0ZW1zIGluIHRoZSBhcnJheSwgYnV0IG5vIG9iamVjdHNcbiAgICAgICAgcmV0dXJuIFtjdXJyZW50S2V5UGF0aF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdWJBcnJheUtleXMgPSBzdWJBcnJheUtleXMubWFwKChzY2hlbWFLZXlzKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWFLZXlzKSAmJiBzY2hlbWFLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbY3VycmVudEtleVBhdGhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYUtleXMubWFwKChzdWJLZXkpID0+IGJ1aWxkS2V5TmFtZShjdXJyZW50S2V5UGF0aCwgZXNjYXBlTmVzdGVkRG90c0lmU3BlY2lmaWVkKHN1YktleSwgb3B0aW9ucykpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1dGlscy51bmlxdWUodXRpbHMuZmxhdHRlbihzdWJBcnJheUtleXMpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlc2NhcGVOZXN0ZWREb3RzSWZTcGVjaWZpZWQoa2V5LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuZXNjYXBlTmVzdGVkRG90cykge1xuICAgICAgICByZXR1cm4ga2V5LnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cbi8qKlxuICogRnVuY3Rpb24gdXNlZCB0byBnZW5lcmF0ZSB0aGUga2V5IHBhdGhcbiAqIEBwYXJhbSB1cHBlcktleU5hbWUgU3RyaW5nIGFjY3VtdWxhdGVkIGtleSBwYXRoXG4gKiBAcGFyYW0gY3VycmVudEtleU5hbWUgU3RyaW5nIGN1cnJlbnQga2V5IG5hbWVcbiAqIEByZXR1cm5zIFN0cmluZ1xuICovXG5mdW5jdGlvbiBidWlsZEtleU5hbWUodXBwZXJLZXlOYW1lLCBjdXJyZW50S2V5TmFtZSkge1xuICAgIGlmICh1cHBlcktleU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVwcGVyS2V5TmFtZSArICcuJyArIGN1cnJlbnRLZXlOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudEtleU5hbWU7XG59XG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFycmF5SW5kZXhlc0FzS2V5czogZmFsc2UsXG4gICAgICAgIGV4cGFuZE5lc3RlZE9iamVjdHM6IHRydWUsXG4gICAgICAgIGV4cGFuZEFycmF5T2JqZWN0czogZmFsc2UsXG4gICAgICAgIGlnbm9yZUVtcHR5QXJyYXlzV2hlbkV4cGFuZGluZzogZmFsc2UsXG4gICAgICAgIGVzY2FwZU5lc3RlZERvdHM6IGZhbHNlLFxuICAgICAgICBpZ25vcmVFbXB0eUFycmF5czogZmFsc2UsXG4gICAgICAgIC4uLihvcHRpb25zID8/IHt9KVxuICAgIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzSW52YWxpZCA9IGV4cG9ydHMuZmxhdHRlbiA9IGV4cG9ydHMudW5pcXVlID0gZXhwb3J0cy5hcnJheURpZmZlcmVuY2UgPSBleHBvcnRzLmlzRXJyb3IgPSBleHBvcnRzLmlzVW5kZWZpbmVkID0gZXhwb3J0cy5pc051bGwgPSBleHBvcnRzLmlzT2JqZWN0ID0gZXhwb3J0cy5pc1N0cmluZyA9IGV4cG9ydHMuaXNOdW1iZXIgPSBleHBvcnRzLnVud2luZCA9IGV4cG9ydHMuZ2V0TkNoYXJhY3RlcnMgPSBleHBvcnRzLnJlbW92ZUVtcHR5RmllbGRzID0gZXhwb3J0cy5pc0VtcHR5RmllbGQgPSBleHBvcnRzLmNvbXB1dGVTY2hlbWFEaWZmZXJlbmNlcyA9IGV4cG9ydHMuaXNEYXRlUmVwcmVzZW50YXRpb24gPSBleHBvcnRzLmlzU3RyaW5nUmVwcmVzZW50YXRpb24gPSBleHBvcnRzLmRlZXBDb3B5ID0gZXhwb3J0cy52YWxpZGF0ZSA9IGV4cG9ydHMuYnVpbGRDMkpPcHRpb25zID0gZXhwb3J0cy5idWlsZEoyQ09wdGlvbnMgPSB2b2lkIDA7XG5jb25zdCBkb2NfcGF0aF8xID0gcmVxdWlyZShcImRvYy1wYXRoXCIpO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XG5jb25zdCBkYXRlU3RyaW5nUmVnZXggPSAvXFxkezR9LVxcZHsyfS1cXGR7Mn1UXFxkezJ9OlxcZHsyfTpcXGR7Mn0uXFxkezN9Wi8sIE1BWF9BUlJBWV9MRU5HVEggPSAxMDAwMDA7XG4vKipcbiAqIEJ1aWxkIHRoZSBvcHRpb25zIHRvIGJlIHBhc3NlZCB0byB0aGUgYXBwcm9wcmlhdGUgZnVuY3Rpb25cbiAqIElmIGEgdXNlciBkb2VzIG5vdCBwcm92aWRlIGN1c3RvbSBvcHRpb25zLCB0aGVuIHdlIHVzZSBvdXIgZGVmYXVsdFxuICogSWYgb3B0aW9ucyBhcmUgcHJvdmlkZWQsIHRoZW4gd2Ugc2V0IGVhY2ggdmFsaWQga2V5IHRoYXQgd2FzIHBhc3NlZFxuICovXG5mdW5jdGlvbiBidWlsZEoyQ09wdGlvbnMob3B0cykge1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbnN0YW50c18xLmRlZmF1bHRKc29uMkNzdk9wdGlvbnMsXG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIGRlbGltaXRlcjoge1xuICAgICAgICAgICAgZmllbGQ6IG9wdHM/LmRlbGltaXRlcj8uZmllbGQgPz8gY29uc3RhbnRzXzEuZGVmYXVsdEpzb24yQ3N2T3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQsXG4gICAgICAgICAgICB3cmFwOiBvcHRzPy5kZWxpbWl0ZXI/LndyYXAgfHwgY29uc3RhbnRzXzEuZGVmYXVsdEpzb24yQ3N2T3B0aW9ucy5kZWxpbWl0ZXIud3JhcCxcbiAgICAgICAgICAgIGVvbDogb3B0cz8uZGVsaW1pdGVyPy5lb2wgfHwgY29uc3RhbnRzXzEuZGVmYXVsdEpzb24yQ3N2T3B0aW9ucy5kZWxpbWl0ZXIuZW9sLFxuICAgICAgICB9LFxuICAgICAgICBmaWVsZFRpdGxlTWFwOiBPYmplY3QuY3JlYXRlKHt9KSxcbiAgICB9O1xufVxuZXhwb3J0cy5idWlsZEoyQ09wdGlvbnMgPSBidWlsZEoyQ09wdGlvbnM7XG4vKipcbiAqIEJ1aWxkIHRoZSBvcHRpb25zIHRvIGJlIHBhc3NlZCB0byB0aGUgYXBwcm9wcmlhdGUgZnVuY3Rpb25cbiAqIElmIGEgdXNlciBkb2VzIG5vdCBwcm92aWRlIGN1c3RvbSBvcHRpb25zLCB0aGVuIHdlIHVzZSBvdXIgZGVmYXVsdFxuICogSWYgb3B0aW9ucyBhcmUgcHJvdmlkZWQsIHRoZW4gd2Ugc2V0IGVhY2ggdmFsaWQga2V5IHRoYXQgd2FzIHBhc3NlZFxuICovXG5mdW5jdGlvbiBidWlsZEMySk9wdGlvbnMob3B0cykge1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbnN0YW50c18xLmRlZmF1bHRDc3YySnNvbk9wdGlvbnMsXG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIGRlbGltaXRlcjoge1xuICAgICAgICAgICAgZmllbGQ6IG9wdHM/LmRlbGltaXRlcj8uZmllbGQgPz8gY29uc3RhbnRzXzEuZGVmYXVsdENzdjJKc29uT3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQsXG4gICAgICAgICAgICB3cmFwOiBvcHRzPy5kZWxpbWl0ZXI/LndyYXAgfHwgY29uc3RhbnRzXzEuZGVmYXVsdENzdjJKc29uT3B0aW9ucy5kZWxpbWl0ZXIud3JhcCxcbiAgICAgICAgICAgIGVvbDogb3B0cz8uZGVsaW1pdGVyPy5lb2wgfHwgY29uc3RhbnRzXzEuZGVmYXVsdENzdjJKc29uT3B0aW9ucy5kZWxpbWl0ZXIuZW9sLFxuICAgICAgICB9LFxuICAgIH07XG59XG5leHBvcnRzLmJ1aWxkQzJKT3B0aW9ucyA9IGJ1aWxkQzJKT3B0aW9ucztcbmZ1bmN0aW9uIHZhbGlkYXRlKGRhdGEsIHZhbGlkYXRpb25GbiwgZXJyb3JNZXNzYWdlcykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycm9yTWVzc2FnZXMuY2Fubm90Q2FsbE9ufSAke2RhdGF9LmApO1xuICAgIGlmICghdmFsaWRhdGlvbkZuKGRhdGEpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlcy5kYXRhQ2hlY2tGYWlsdXJlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiB0byBkZWVwIGNvcHkgYW4gb2JqZWN0LCB1c2VkIGJ5IHRoZSBtb2R1bGUgdGVzdHNcbiAqL1xuZnVuY3Rpb24gZGVlcENvcHkob2JqKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5leHBvcnRzLmRlZXBDb3B5ID0gZGVlcENvcHk7XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSByZXByZXNlbnRhdGlvblxuICogICBvZiBhIHN0cmluZy4gR2l2ZW4gdGhlIFJGQzQxODAgcmVxdWlyZW1lbnRzLCB0aGF0IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGlzXG4gKiAgIHdyYXBwZWQgaW4gdmFsdWUgd3JhcCBkZWxpbWl0ZXJzICh1c3VhbGx5IGEgcXVvdGF0aW9uIG1hcmsgb24gZWFjaCBzaWRlKS5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmdSZXByZXNlbnRhdGlvbihmaWVsZFZhbHVlLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZmlyc3RDaGFyID0gZmllbGRWYWx1ZVswXSwgbGFzdEluZGV4ID0gZmllbGRWYWx1ZS5sZW5ndGggLSAxLCBsYXN0Q2hhciA9IGZpZWxkVmFsdWVbbGFzdEluZGV4XTtcbiAgICAvLyBJZiB0aGUgZmllbGQgc3RhcnRzIGFuZCBlbmRzIHdpdGggYSB3cmFwIGRlbGltaXRlclxuICAgIHJldHVybiBmaXJzdENoYXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgbGFzdENoYXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXA7XG59XG5leHBvcnRzLmlzU3RyaW5nUmVwcmVzZW50YXRpb24gPSBpc1N0cmluZ1JlcHJlc2VudGF0aW9uO1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgcmVwcmVzZW50YXRpb25cbiAqICAgb2YgYSBkYXRlLlxuICovXG5mdW5jdGlvbiBpc0RhdGVSZXByZXNlbnRhdGlvbihmaWVsZFZhbHVlKSB7XG4gICAgcmV0dXJuIGRhdGVTdHJpbmdSZWdleC50ZXN0KGZpZWxkVmFsdWUpO1xufVxuZXhwb3J0cy5pc0RhdGVSZXByZXNlbnRhdGlvbiA9IGlzRGF0ZVJlcHJlc2VudGF0aW9uO1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY2hlbWEgZGlmZmVyZW5jZXMgYmV0d2VlbiB0d28gb2JqZWN0cy5cbiAqL1xuZnVuY3Rpb24gY29tcHV0ZVNjaGVtYURpZmZlcmVuY2VzKHNjaGVtYUEsIHNjaGVtYUIpIHtcbiAgICByZXR1cm4gYXJyYXlEaWZmZXJlbmNlKHNjaGVtYUEsIHNjaGVtYUIpXG4gICAgICAgIC5jb25jYXQoYXJyYXlEaWZmZXJlbmNlKHNjaGVtYUIsIHNjaGVtYUEpKTtcbn1cbmV4cG9ydHMuY29tcHV0ZVNjaGVtYURpZmZlcmVuY2VzID0gY29tcHV0ZVNjaGVtYURpZmZlcmVuY2VzO1xuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIGEgZmllbGQgaXMgY29uc2lkZXJlZCBlbXB0eSBzbyB0aGF0IHRoZSBlbXB0eUZpZWxkVmFsdWUgY2FuIGJlIHVzZWQgaW5zdGVhZFxuICovXG5mdW5jdGlvbiBpc0VtcHR5RmllbGQoZmllbGRWYWx1ZSkge1xuICAgIHJldHVybiBpc1VuZGVmaW5lZChmaWVsZFZhbHVlKSB8fCBpc051bGwoZmllbGRWYWx1ZSkgfHwgZmllbGRWYWx1ZSA9PT0gJyc7XG59XG5leHBvcnRzLmlzRW1wdHlGaWVsZCA9IGlzRW1wdHlGaWVsZDtcbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBlbXB0eSBmaWVsZCB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRW1wdHlGaWVsZHMoZmllbGRzKSB7XG4gICAgcmV0dXJuIGZpZWxkcy5maWx0ZXIoKGZpZWxkKSA9PiAhaXNFbXB0eUZpZWxkKGZpZWxkKSk7XG59XG5leHBvcnRzLnJlbW92ZUVtcHR5RmllbGRzID0gcmVtb3ZlRW1wdHlGaWVsZHM7XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHJpZXZlcyB0aGUgbmV4dCBuIGNoYXJhY3RlcnMgZnJvbSB0aGUgc3RhcnQgaW5kZXggaW5cbiAqICAgdGhlIHN0cmluZyBpbmNsdWRpbmcgdGhlIGNoYXJhY3RlciBhdCB0aGUgc3RhcnQgaW5kZXguIFRoaXMgaXMgdXNlZCB0b1xuICogICBjaGVjayBpZiBhcmUgY3VycmVudGx5IGF0IGFuIEVPTCB2YWx1ZSwgc2luY2UgaXQgY291bGQgYmUgbXVsdGlwbGVcbiAqICAgY2hhcmFjdGVycyBpbiBsZW5ndGggKGVnLiAnXFxyXFxuJylcbiAqL1xuZnVuY3Rpb24gZ2V0TkNoYXJhY3RlcnMoc3RyLCBzdGFydCwgbikge1xuICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBzdGFydCArIG4pO1xufVxuZXhwb3J0cy5nZXROQ2hhcmFjdGVycyA9IGdldE5DaGFyYWN0ZXJzO1xuLyoqXG4gKiBUaGUgZm9sbG93aW5nIHVud2luZCBmdW5jdGlvbmFsaXR5IGlzIGEgaGVhdmlseSBtb2RpZmllZCB2ZXJzaW9uIG9mIEBlZHdpbmNlbidzXG4gKiB1bndpbmQgZXh0ZW5zaW9uIGZvciBsb2Rhc2guIFNpbmNlIGxvZGFzaCBpcyBhIGxhcmdlIHBhY2thZ2UgdG8gcmVxdWlyZSBpbixcbiAqIGFuZCBhbGwgb2YgdGhlIHJlcXVpcmVkIGZ1bmN0aW9uYWxpdHkgd2FzIGFscmVhZHkgYmVpbmcgaW1wb3J0ZWQsIGVpdGhlclxuICogbmF0aXZlbHkgb3Igd2l0aCBkb2MtcGF0aCwgSSBkZWNpZGVkIHRvIHJld3JpdGUgdGhlIG1ham9yaXR5IG9mIHRoZSBsb2dpY1xuICogc28gdGhhdCBhbiBhZGRpdGlvbmFsIGRlcGVuZGVuY3kgd291bGQgbm90IGJlIHJlcXVpcmVkLiBUaGUgb3JpZ2luYWwgY29kZVxuICogd2l0aCB0aGUgbG9kYXNoIGRlcGVuZGVuY3kgY2FuIGJlIGZvdW5kIGhlcmU6XG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2Vkd2luY2VuL3Vud2luZC9ibG9iL21hc3Rlci9pbmRleC5qc1xuICovXG4vKipcbiAqIENvcmUgZnVuY3Rpb24gdGhhdCB1bndpbmRzIGFuIGl0ZW0gYXQgdGhlIHByb3ZpZGVkIHBhdGhcbiAqL1xuZnVuY3Rpb24gdW53aW5kSXRlbShhY2N1bXVsYXRvciwgaXRlbSwgZmllbGRQYXRoKSB7XG4gICAgY29uc3QgdmFsdWVUb1Vud2luZCA9ICgwLCBkb2NfcGF0aF8xLmV2YWx1YXRlUGF0aCkoaXRlbSwgZmllbGRQYXRoKTtcbiAgICBsZXQgY2xvbmVkID0gZGVlcENvcHkoaXRlbSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVUb1Vud2luZCkgJiYgdmFsdWVUb1Vud2luZC5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWVUb1Vud2luZC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGNsb25lZCA9IGRlZXBDb3B5KGl0ZW0pO1xuICAgICAgICAgICAgYWNjdW11bGF0b3IucHVzaCgoMCwgZG9jX3BhdGhfMS5zZXRQYXRoKShjbG9uZWQsIGZpZWxkUGF0aCwgdmFsKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlVG9VbndpbmQpICYmIHZhbHVlVG9VbndpbmQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIFB1c2ggYW4gZW1wdHkgc3RyaW5nIHNvIHRoZSB2YWx1ZSBpcyBlbXB0eSBzaW5jZSB0aGVyZSBhcmUgbm8gdmFsdWVzXG4gICAgICAgICgwLCBkb2NfcGF0aF8xLnNldFBhdGgpKGNsb25lZCwgZmllbGRQYXRoLCAnJyk7XG4gICAgICAgIGFjY3VtdWxhdG9yLnB1c2goY2xvbmVkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFjY3VtdWxhdG9yLnB1c2goY2xvbmVkKTtcbiAgICB9XG59XG4vKipcbiAqIE1haW4gdW53aW5kIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGFuIGFycmF5IGFuZCBhIGZpZWxkIHRvIHVud2luZC5cbiAqL1xuZnVuY3Rpb24gdW53aW5kKGFycmF5LCBmaWVsZCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdW53aW5kSXRlbShyZXN1bHQsIGl0ZW0sIGZpZWxkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy51bndpbmQgPSB1bndpbmQ7XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHZhbHVlIGNhbiBiZSBjb252ZXJ0ZWQgdG8gYSBudW1iZXJcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gIWlzTmFOKE51bWJlcih2YWx1ZSkpO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgd2hpY2ggd2VyZSBjcmVhdGVkIHRvIHJlbW92ZSB1bmRlcnNjb3JlanMgZnJvbSB0aGlzIHBhY2thZ2UuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuZnVuY3Rpb24gaXNOdWxsKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuZnVuY3Rpb24gaXNFcnJvcih2YWx1ZSkge1xuICAgIC8vIFRPRE8obXJvZHJpZyk6IHRlc3QgdGhpcyBwb3NzaWJsZSBjaGFuZ2VcbiAgICAvLyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFcnJvcjtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJztcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5mdW5jdGlvbiBhcnJheURpZmZlcmVuY2UoYSwgYikge1xuICAgIHJldHVybiBhLmZpbHRlcigoeCkgPT4gIWIuaW5jbHVkZXMoeCkpO1xufVxuZXhwb3J0cy5hcnJheURpZmZlcmVuY2UgPSBhcnJheURpZmZlcmVuY2U7XG5mdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoYXJyYXkpXTtcbn1cbmV4cG9ydHMudW5pcXVlID0gdW5pcXVlO1xuZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICAgIC8vIE5vZGUgMTErIC0gdXNlIHRoZSBuYXRpdmUgYXJyYXkgZmxhdHRlbmluZyBmdW5jdGlvblxuICAgIGlmIChhcnJheS5mbGF0KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5mbGF0KCk7XG4gICAgfVxuICAgIC8vICMxNjcgLSBhbGxvdyBicm93c2VycyB0byBmbGF0dGVuIHZlcnkgbG9uZyAyMDBrKyBlbGVtZW50IGFycmF5c1xuICAgIGlmIChhcnJheS5sZW5ndGggPiBNQVhfQVJSQVlfTEVOR1RIKSB7XG4gICAgICAgIGxldCBzYWZlQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhcnJheS5sZW5ndGg7IGEgKz0gTUFYX0FSUkFZX0xFTkdUSCkge1xuICAgICAgICAgICAgc2FmZUFycmF5ID0gc2FmZUFycmF5LmNvbmNhdCguLi5hcnJheS5zbGljZShhLCBhICsgTUFYX0FSUkFZX0xFTkdUSCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzYWZlQXJyYXk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCB2YWx1ZSkgPT4gYWNjdW11bGF0b3IuY29uY2F0KHZhbHVlKSwgW10pO1xufVxuZXhwb3J0cy5mbGF0dGVuID0gZmxhdHRlbjtcbi8qKlxuICogVXNlZCB0byBoZWxwIGF2b2lkIGluY29ycmVjdCB2YWx1ZXMgcmV0dXJuZWQgYnkgSlNPTi5wYXJzZSB3aGVuIGNvbnZlcnRpbmdcbiAqIENTViBiYWNrIHRvIEpTT04sIHN1Y2ggYXMgJzM5ZTE4MDQnIHdoaWNoIEpTT04ucGFyc2UgY29udmVydHMgdG8gSW5maW5pdHlcbiAqL1xuZnVuY3Rpb24gaXNJbnZhbGlkKHBhcnNlZEpzb24pIHtcbiAgICByZXR1cm4gcGFyc2VkSnNvbiA9PT0gSW5maW5pdHkgfHxcbiAgICAgICAgcGFyc2VkSnNvbiA9PT0gLUluZmluaXR5O1xufVxuZXhwb3J0cy5pc0ludmFsaWQgPSBpc0ludmFsaWQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSnNvbjJDc3YgPSB2b2lkIDA7XG5jb25zdCBkb2NfcGF0aF8xID0gcmVxdWlyZShcImRvYy1wYXRoXCIpO1xuY29uc3QgZGVla3NfMSA9IHJlcXVpcmUoXCJkZWVrc1wiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuY29uc3QgdXRpbHMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vdXRpbHNcIikpO1xuY29uc3QgSnNvbjJDc3YgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGNvbnN0IHdyYXBEZWxpbWl0ZXJDaGVja1JlZ2V4ID0gbmV3IFJlZ0V4cChvcHRpb25zLmRlbGltaXRlci53cmFwLCAnZycpLCBjcmxmU2VhcmNoUmVnZXggPSAvXFxyP1xcbnxcXHIvLCBjdXN0b21WYWx1ZVBhcnNlciA9IG9wdGlvbnMucGFyc2VWYWx1ZSAmJiB0eXBlb2Ygb3B0aW9ucy5wYXJzZVZhbHVlID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5wYXJzZVZhbHVlIDogbnVsbCwgZXhwYW5kaW5nV2l0aG91dFVud2luZGluZyA9IG9wdGlvbnMuZXhwYW5kQXJyYXlPYmplY3RzICYmICFvcHRpb25zLnVud2luZEFycmF5cywgZGVla3NPcHRpb25zID0ge1xuICAgICAgICBhcnJheUluZGV4ZXNBc0tleXM6IG9wdGlvbnMuYXJyYXlJbmRleGVzQXNLZXlzLFxuICAgICAgICBleHBhbmROZXN0ZWRPYmplY3RzOiBvcHRpb25zLmV4cGFuZE5lc3RlZE9iamVjdHMsXG4gICAgICAgIGV4cGFuZEFycmF5T2JqZWN0czogZXhwYW5kaW5nV2l0aG91dFVud2luZGluZyxcbiAgICAgICAgaWdub3JlRW1wdHlBcnJheXNXaGVuRXhwYW5kaW5nOiBleHBhbmRpbmdXaXRob3V0VW53aW5kaW5nLFxuICAgICAgICBlc2NhcGVOZXN0ZWREb3RzOiB0cnVlLFxuICAgIH07XG4gICAgLyoqIEhFQURFUiBGSUVMRCBGVU5DVElPTlMgKiovXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCBvZiBkYXRhIGZpZWxkIG5hbWVzIG9mIGFsbCBkb2N1bWVudHMgaW4gdGhlIHByb3ZpZGVkIGxpc3RcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRGaWVsZE5hbWVMaXN0KGRhdGEpIHtcbiAgICAgICAgLy8gSWYga2V5cyB3ZXJlbid0IHNwZWNpZmllZCwgdGhlbiB3ZSdsbCB1c2UgdGhlIGxpc3Qgb2Yga2V5cyBnZW5lcmF0ZWQgYnkgdGhlIGRlZWtzIG1vZHVsZVxuICAgICAgICByZXR1cm4gKDAsIGRlZWtzXzEuZGVlcEtleXNGcm9tTGlzdCkoZGF0YSwgZGVla3NPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIHRoZSBzY2hlbWFzIGJ5IGNoZWNraW5nIGZvciBzY2hlbWEgZGlmZmVyZW5jZXMsIGlmIHNvIGRlc2lyZWQuXG4gICAgICogSWYgc2NoZW1hIGRpZmZlcmVuY2VzIGFyZSBub3QgdG8gYmUgY2hlY2tlZCwgdGhlbiBpdCByZXNvbHZlcyB0aGUgdW5pcXVlXG4gICAgICogbGlzdCBvZiBmaWVsZCBuYW1lcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9jZXNzU2NoZW1hcyhkb2N1bWVudFNjaGVtYXMpIHtcbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FudHMgdG8gY2hlY2sgZm9yIHRoZSBzYW1lIHNjaGVtYSAocmVnYXJkbGVzcyBvZiBzY2hlbWEgb3JkZXJpbmcpXG4gICAgICAgIGlmIChvcHRpb25zLmNoZWNrU2NoZW1hRGlmZmVyZW5jZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja1NjaGVtYURpZmZlcmVuY2VzKGRvY3VtZW50U2NoZW1hcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGRvIG5vdCBjYXJlIGlmIHRoZSBzY2hlbWFzIGFyZSBkaWZmZXJlbnQsIHNvIHdlIHNob3VsZCBnZXQgdGhlIHVuaXF1ZSBsaXN0IG9mIGtleXNcbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUZpZWxkTmFtZXMgPSB1dGlscy51bmlxdWUodXRpbHMuZmxhdHRlbihkb2N1bWVudFNjaGVtYXMpKTtcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVGaWVsZE5hbWVzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gcGVyZm9ybXMgdGhlIHNjaGVtYSBkaWZmZXJlbmNlIGNoZWNrLCBpZiB0aGUgdXNlciBzcGVjaWZpZXMgdGhhdCBpdCBzaG91bGQgYmUgY2hlY2tlZC5cbiAgICAgKiBJZiB0aGVyZSBhcmUgbm8gZmllbGQgbmFtZXMsIHRoZW4gdGhlcmUgYXJlIG5vIGRpZmZlcmVuY2VzLlxuICAgICAqIE90aGVyd2lzZSwgd2UgZ2V0IHRoZSBmaXJzdCBzY2hlbWEgYW5kIHRoZSByZW1haW5pbmcgbGlzdCBvZiBzY2hlbWFzXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hlY2tTY2hlbWFEaWZmZXJlbmNlcyhkb2N1bWVudFNjaGVtYXMpIHtcbiAgICAgICAgLy8gaGF2ZSBtdWx0aXBsZSBkb2N1bWVudHMgLSBlbnN1cmUgb25seSBvbmUgc2NoZW1hIChyZWdhcmRsZXNzIG9mIGZpZWxkIG9yZGVyaW5nKVxuICAgICAgICBjb25zdCBmaXJzdERvY1NjaGVtYSA9IGRvY3VtZW50U2NoZW1hc1swXSwgcmVzdE9mRG9jdW1lbnRTY2hlbWFzID0gZG9jdW1lbnRTY2hlbWFzLnNsaWNlKDEpLCBzY2hlbWFEaWZmZXJlbmNlcyA9IGNvbXB1dGVOdW1iZXJPZlNjaGVtYURpZmZlcmVuY2VzKGZpcnN0RG9jU2NoZW1hLCByZXN0T2ZEb2N1bWVudFNjaGVtYXMpO1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgc2NoZW1hIGluY29uc2lzdGVuY2llcywgdGhyb3cgYSBzY2hlbWEgbm90IHRoZSBzYW1lIGVycm9yXG4gICAgICAgIGlmIChzY2hlbWFEaWZmZXJlbmNlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNvbnN0YW50c18xLmVycm9ycy5qc29uMmNzdi5ub3RTYW1lU2NoZW1hKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlyc3REb2NTY2hlbWE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHRoZSBudW1iZXIgb2Ygc2NoZW1hIGRpZmZlcmVuY2VzXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29tcHV0ZU51bWJlck9mU2NoZW1hRGlmZmVyZW5jZXMoZmlyc3REb2NTY2hlbWEsIHJlc3RPZkRvY3VtZW50U2NoZW1hcykge1xuICAgICAgICByZXR1cm4gcmVzdE9mRG9jdW1lbnRTY2hlbWFzLnJlZHVjZSgoc2NoZW1hRGlmZmVyZW5jZXMsIGRvY3VtZW50U2NoZW1hKSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgc2NoZW1hcywgaW5jcmVtZW50IHRoZSBjb3VudGVyIG9mIHNjaGVtYSBpbmNvbnNpc3RlbmNpZXNcbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mRGlmZmVyZW5jZXMgPSB1dGlscy5jb21wdXRlU2NoZW1hRGlmZmVyZW5jZXMoZmlyc3REb2NTY2hlbWEsIGRvY3VtZW50U2NoZW1hKS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyT2ZEaWZmZXJlbmNlcyA+IDBcbiAgICAgICAgICAgICAgICA/IHNjaGVtYURpZmZlcmVuY2VzICsgMVxuICAgICAgICAgICAgICAgIDogc2NoZW1hRGlmZmVyZW5jZXM7XG4gICAgICAgIH0sIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBzbyBzcGVjaWZpZWQsIHRoaXMgZmlsdGVycyB0aGUgZGV0ZWN0ZWQga2V5IHBhdGhzIHRvIGV4Y2x1ZGUgYW55IGtleXMgdGhhdCBoYXZlIGJlZW4gc3BlY2lmaWVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmlsdGVyRXhjbHVkZWRLZXlzKGtleVBhdGhzKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4Y2x1ZGVLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5UGF0aHMuZmlsdGVyKChrZXlQYXRoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBleGNsdWRlZEtleSBvZiBvcHRpb25zLmV4Y2x1ZGVLZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgbWF0Y2ggaWYgdGhlIGV4Y2x1ZGVkS2V5IGFwcGVhcnMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc3RyaW5nIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBtYXRjaCBhIGtleSBmYXJ0aGVyIGRvd24gaW4gYSBrZXkgcGF0aFxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IGV4Y2x1ZGVkS2V5IGluc3RhbmNlb2YgUmVnRXhwID8gZXhjbHVkZWRLZXkgOiBuZXcgUmVnRXhwKGBeJHtleGNsdWRlZEtleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y2x1ZGVkS2V5ID09PSBrZXlQYXRoIHx8IGtleVBhdGgubWF0Y2gocmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEV4Y2x1ZGUgdGhlIGtleVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBPdGhlcndpc2UsIGluY2x1ZGUgdGhlIGtleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleVBhdGhzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBzbyBzcGVjaWZpZWQsIHRoaXMgc29ydHMgdGhlIGhlYWRlciBmaWVsZCBuYW1lcyBhbHBoYWJldGljYWxseVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNvcnRIZWFkZXJGaWVsZHMoZmllbGROYW1lcykge1xuICAgICAgICBpZiAob3B0aW9ucy5zb3J0SGVhZGVyICYmIHR5cGVvZiBvcHRpb25zLnNvcnRIZWFkZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZE5hbWVzLnNvcnQob3B0aW9ucy5zb3J0SGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLnNvcnRIZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZE5hbWVzLnNvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGROYW1lcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpbXMgdGhlIGhlYWRlciBmaWVsZHMsIGlmIHRoZSB1c2VyIGRlc2lyZXMgdGhlbSB0byBiZSB0cmltbWVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyaW1IZWFkZXJGaWVsZHMocGFyYW1zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnRyaW1IZWFkZXJGaWVsZHMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5oZWFkZXJGaWVsZHMgPSBwYXJhbXMuaGVhZGVyRmllbGRzLm1hcCgoZmllbGQpID0+IGZpZWxkLnNwbGl0KCcuJylcbiAgICAgICAgICAgICAgICAubWFwKChjb21wb25lbnQpID0+IGNvbXBvbmVudC50cmltKCkpXG4gICAgICAgICAgICAgICAgLmpvaW4oJy4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JhcCB0aGUgaGVhZGluZ3MsIGlmIGRlc2lyZWQgYnkgdGhlIHVzZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gd3JhcEhlYWRlckZpZWxkcyhwYXJhbXMpIHtcbiAgICAgICAgLy8gb25seSBwZXJmb3JtIHRoaXMgaWYgd2UgYXJlIGFjdHVhbGx5IHByZXBlbmRpbmcgdGhlIGhlYWRlclxuICAgICAgICBpZiAob3B0aW9ucy5wcmVwZW5kSGVhZGVyKSB7XG4gICAgICAgICAgICBwYXJhbXMuaGVhZGVyRmllbGRzID0gcGFyYW1zLmhlYWRlckZpZWxkcy5tYXAoZnVuY3Rpb24gKGhlYWRpbmdLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd3JhcEZpZWxkVmFsdWVJZk5lY2Vzc2FyeShoZWFkaW5nS2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgQ1NWIGhlYWRlciBzdHJpbmcgYnkgam9pbmluZyB0aGUgaGVhZGVyRmllbGRzIGJ5IHRoZSBmaWVsZCBkZWxpbWl0ZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUNzdkhlYWRlcihwYXJhbXMpIHtcbiAgICAgICAgLy8gIzE4NSAtIGdlbmVyYXRlIGEga2V5cyBsaXN0IHRvIGF2b2lkIGZpbmRpbmcgbmF0aXZlIE1hcCgpIG1ldGhvZHNcbiAgICAgICAgY29uc3QgZmllbGRUaXRsZU1hcEtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLmZpZWxkVGl0bGVNYXApO1xuICAgICAgICBwYXJhbXMuaGVhZGVyID0gcGFyYW1zLmhlYWRlckZpZWxkc1xuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIGxldCBoZWFkZXJLZXkgPSBmaWVsZDtcbiAgICAgICAgICAgIC8vIElmIGEgY3VzdG9tIGZpZWxkIHRpdGxlIHdhcyBwcm92aWRlZCBmb3IgdGhpcyBmaWVsZCwgdXNlIHRoYXRcbiAgICAgICAgICAgIGlmIChmaWVsZFRpdGxlTWFwS2V5cy5pbmNsdWRlcyhmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJLZXkgPSBvcHRpb25zLmZpZWxkVGl0bGVNYXBbZmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIW9wdGlvbnMuZXNjYXBlSGVhZGVyTmVzdGVkRG90cykge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaWYgdGhlIHVzZXIgZG9lc24ndCB3YW50IG5lc3RlZCBkb3RzIGluIGtleXMgdG8gYmUgZXNjYXBlZCwgdGhlbiB1bmVzY2FwZSB0aGVtXG4gICAgICAgICAgICAgICAgaGVhZGVyS2V5ID0gaGVhZGVyS2V5LnJlcGxhY2UoL1xcXFxcXC4vZywgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3cmFwRmllbGRWYWx1ZUlmTmVjZXNzYXJ5KGhlYWRlcktleSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihvcHRpb25zLmRlbGltaXRlci5maWVsZCk7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbnZlcnRLZXlzVG9IZWFkZXJGaWVsZHMoKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5rZXlzKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5rZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgJiYgJ2ZpZWxkJyBpbiBrZXkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZpZWxkVGl0bGVNYXBba2V5LmZpZWxkXSA9IGtleS50aXRsZSA/PyBrZXkuZmllbGQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleS5maWVsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRyYWN0V2lsZGNhcmRNYXRjaEtleXMoKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5rZXlzKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5rZXlzLmZsYXRNYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy8gRXhjbHVkZSBwbGFpbiBzdHJpbmdzIHRoYXQgd2VyZSBwYXNzZWQgaW4gb3B0aW9ucy5rZXlzXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbT8ud2lsZGNhcmRNYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiBcImZpZWxkXCIgdmFsdWUgZm9yIG9iamVjdHMgd2l0aCB3aWxkY2FyZE1hdGNoOiB0cnVlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZmllbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFeGNsdWRlIG90aGVyIG9iamVjdHNcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBoZWFkaW5ncyBmb3IgYWxsIGRvY3VtZW50cyBhbmQgcmV0dXJuIGl0LlxuICAgICAqIFRoaXMgY2hlY2tzIHRoYXQgYWxsIGRvY3VtZW50cyBoYXZlIHRoZSBzYW1lIHNjaGVtYS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXRyaWV2ZUhlYWRlckZpZWxkcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IHdpbGRjYXJkTWF0Y2hLZXlzID0gZXh0cmFjdFdpbGRjYXJkTWF0Y2hLZXlzKCk7XG4gICAgICAgIGNvbnN0IGtleVN0cmluZ3MgPSBjb252ZXJ0S2V5c1RvSGVhZGVyRmllbGRzKCk7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBnZXRGaWVsZE5hbWVMaXN0KGRhdGEpO1xuICAgICAgICBjb25zdCBwcm9jZXNzZWQgPSBwcm9jZXNzU2NoZW1hcyhmaWVsZE5hbWVzKTtcbiAgICAgICAgaWYgKG9wdGlvbnMua2V5cykge1xuICAgICAgICAgICAgb3B0aW9ucy5rZXlzID0ga2V5U3RyaW5ncztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRLZXlzID0ga2V5U3RyaW5ncy5mbGF0TWFwKCh1c2VyUHJvdmlkZWRLZXkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHdpbGRjYXJkIG1hdGNoZWQga2V5LCB0aGVuIGp1c3QgcmV0dXJuIGFuZCBpbmNsdWRlIGl0IGluIHRoZSByZXN1bHRpbmcga2V5IGxpc3RcbiAgICAgICAgICAgICAgICBpZiAoIXdpbGRjYXJkTWF0Y2hLZXlzLmluY2x1ZGVzKHVzZXJQcm92aWRlZEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJQcm92aWRlZEtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBpZGVudGlmeSBhbGwgZGV0ZWN0ZWQga2V5cyB0aGF0IG1hdGNoIHdpdGggdGhlIHByb3ZpZGVkIHdpbGRjYXJkIGtleTpcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHt1c2VyUHJvdmlkZWRLZXl9YCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXRlY3RlZEtleSBvZiBwcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJQcm92aWRlZEtleSA9PT0gZGV0ZWN0ZWRLZXkgfHwgZGV0ZWN0ZWRLZXkubWF0Y2gocmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goZGV0ZWN0ZWRLZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudW53aW5kQXJyYXlzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBmaWx0ZXJFeGNsdWRlZEtleXMobWF0Y2hlZEtleXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3J0SGVhZGVyRmllbGRzKGZpbHRlcmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlckV4Y2x1ZGVkS2V5cyhwcm9jZXNzZWQpO1xuICAgICAgICByZXR1cm4gc29ydEhlYWRlckZpZWxkcyhmaWx0ZXJlZCk7XG4gICAgfVxuICAgIC8qKiBSRUNPUkQgRklFTEQgRlVOQ1RJT05TICoqL1xuICAgIC8qKlxuICAgICAqIFVud2luZHMgb2JqZWN0cyBpbiBhcnJheXMgd2l0aGluIHJlY29yZCBvYmplY3RzIGlmIHRoZSB1c2VyIHNwZWNpZmllcyB0aGVcbiAgICAgKiBleHBhbmRBcnJheU9iamVjdHMgb3B0aW9uLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGlzIHBhc3NlcyB0aGUgcGFyYW1zXG4gICAgICogYXJndW1lbnQgdGhyb3VnaCB0byB0aGUgbmV4dCBmdW5jdGlvbiBpbiB0aGUgcHJvbWlzZSBjaGFpbi5cbiAgICAgKlxuICAgICAqIFRoZSBgZmluYWxQYXNzYCBwYXJhbWV0ZXIgaXMgdXNlZCB0byB0cmlnZ2VyIG9uZSBsYXN0IHBhc3MgdG8gZW5zdXJlIG5vIG1vcmVcbiAgICAgKiBhcnJheXMgbmVlZCB0byBiZSBleHBhbmRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVud2luZFJlY29yZHNJZk5lY2Vzc2FyeShwYXJhbXMsIGZpbmFsUGFzcyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnVud2luZEFycmF5cykge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxSZWNvcmRzTGVuZ3RoID0gcGFyYW1zLnJlY29yZHMubGVuZ3RoO1xuICAgICAgICAgICAgLy8gVW53aW5kIGVhY2ggb2YgdGhlIGRvY3VtZW50cyBhdCB0aGUgZ2l2ZW4gaGVhZGVyRmllbGRcbiAgICAgICAgICAgIHBhcmFtcy5oZWFkZXJGaWVsZHMuZm9yRWFjaCgoaGVhZGVyRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucmVjb3JkcyA9IHV0aWxzLnVud2luZChwYXJhbXMucmVjb3JkcywgaGVhZGVyRmllbGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJGaWVsZHMgPSByZXRyaWV2ZUhlYWRlckZpZWxkcyhwYXJhbXMucmVjb3Jkcyk7XG4gICAgICAgICAgICBwYXJhbXMuaGVhZGVyRmllbGRzID0gaGVhZGVyRmllbGRzO1xuICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSBhYmxlIHRvIHVud2luZCBtb3JlIGFycmF5cywgdGhlbiB0cnkgdW53aW5kaW5nIGFnYWluLi4uXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxSZWNvcmRzTGVuZ3RoICE9PSBwYXJhbXMucmVjb3Jkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW53aW5kUmVjb3Jkc0lmTmVjZXNzYXJ5KHBhcmFtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGRpZG4ndCB1bndpbmQgYW55IGFkZGl0aW9uYWwgYXJyYXlzLCBzbyBjb250aW51ZS4uLlxuICAgICAgICAgICAgLy8gUnVuIGEgZmluYWwgdGltZSBpbiBjYXNlIHRoZSBlYXJsaWVyIHVud2luZGluZyBleHBvc2VkIGFkZGl0aW9uYWxcbiAgICAgICAgICAgIC8vIGFycmF5cyB0byB1bndpbmQuLi5cbiAgICAgICAgICAgIGlmICghZmluYWxQYXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVud2luZFJlY29yZHNJZk5lY2Vzc2FyeShwYXJhbXMsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYga2V5cyB3ZXJlIHByb3ZpZGVkLCBzZXQgdGhlIGhlYWRlckZpZWxkcyBiYWNrIHRvIHRoZSBwcm92aWRlZCBrZXlzIGFmdGVyIHVud2luZGluZzpcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmtleXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyU2VsZWN0ZWRGaWVsZHMgPSBjb252ZXJ0S2V5c1RvSGVhZGVyRmllbGRzKCk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmhlYWRlckZpZWxkcyA9IGZpbHRlckV4Y2x1ZGVkS2V5cyh1c2VyU2VsZWN0ZWRGaWVsZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWluIGZ1bmN0aW9uIHdoaWNoIGhhbmRsZXMgdGhlIHByb2Nlc3Npbmcgb2YgYSByZWNvcmQsIG9yIGRvY3VtZW50IHRvIGJlIGNvbnZlcnRlZCB0byBDU1YgZm9ybWF0XG4gICAgICogVGhpcyBmdW5jdGlvbiBzcGVjaWZpZXMgYW5kIHBlcmZvcm1zIHRoZSBuZWNlc3Nhcnkgb3BlcmF0aW9ucyBpbiB0aGUgbmVjZXNzYXJ5IG9yZGVyXG4gICAgICogaW4gb3JkZXIgdG8gb2J0YWluIHRoZSBkYXRhIGFuZCBjb252ZXJ0IGl0IHRvIENTViBmb3JtIHdoaWxlIG1haW50YWluaW5nIFJGQyA0MTgwIGNvbXBsaWFuY2UuXG4gICAgICogKiBPcmRlciBvZiBvcGVyYXRpb25zOlxuICAgICAqIC0gR2V0IGZpZWxkcyBmcm9tIHByb3ZpZGVkIGtleSBsaXN0IChhcyBhcnJheSBvZiBhY3R1YWwgdmFsdWVzKVxuICAgICAqIC0gQ29udmVydCB0aGUgdmFsdWVzIHRvIGNzdi9zdHJpbmcgcmVwcmVzZW50YXRpb24gW3Bvc3NpYmxlIG9wdGlvbiBoZXJlIGZvciBjdXN0b20gY29udmVydGVycz9dXG4gICAgICogLSBUcmltIGZpZWxkc1xuICAgICAqIC0gRGV0ZXJtaW5lIGlmIHRoZXkgbmVlZCB0byBiZSB3cmFwcGVkICgmIHdyYXAgaWYgbmVjZXNzYXJ5KVxuICAgICAqIC0gQ29tYmluZSB2YWx1ZXMgZm9yIGVhY2ggbGluZSAoYnkgam9pbmluZyBieSBmaWVsZCBkZWxpbWl0ZXIpXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1JlY29yZHMocGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcy5yZWNvcmRTdHJpbmcgPSBwYXJhbXMucmVjb3Jkcy5tYXAoKHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgLy8gUmV0cmlldmUgZGF0YSBmb3IgZWFjaCBvZiB0aGUgaGVhZGVyRmllbGRzIGZyb20gdGhpcyByZWNvcmRcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZEZpZWxkRGF0YSA9IHJldHJpZXZlUmVjb3JkRmllbGREYXRhKHJlY29yZCwgcGFyYW1zLmhlYWRlckZpZWxkcyksIFxuICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgZGF0YSBpbiB0aGlzIHJlY29yZCBhbmQgcmV0dXJuIHRoZVxuICAgICAgICAgICAgcHJvY2Vzc2VkUmVjb3JkRGF0YSA9IHJlY29yZEZpZWxkRGF0YS5tYXAoKGZpZWxkVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gdHJpbVJlY29yZEZpZWxkVmFsdWUoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHByZXZlbnRDc3ZJbmplY3Rpb24oZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZ2lmaWVkID0gY3VzdG9tVmFsdWVQYXJzZXIgPyBjdXN0b21WYWx1ZVBhcnNlcihmaWVsZFZhbHVlLCByZWNvcmRGaWVsZFZhbHVlVG9TdHJpbmcpIDogcmVjb3JkRmllbGRWYWx1ZVRvU3RyaW5nKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIHN0cmluZ2lmaWVkID0gd3JhcEZpZWxkVmFsdWVJZk5lY2Vzc2FyeShzdHJpbmdpZmllZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmaWVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBKb2luIHRoZSByZWNvcmQgZGF0YSBieSB0aGUgZmllbGQgZGVsaW1pdGVyXG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVDc3ZSb3dGcm9tUmVjb3JkKHByb2Nlc3NlZFJlY29yZERhdGEpO1xuICAgICAgICB9KS5qb2luKG9wdGlvbnMuZGVsaW1pdGVyLmVvbCk7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiBpbnRlbmRlZCB0byBwcm9jZXNzICpqdXN0KiBhcnJheSB2YWx1ZXMgd2hlbiB0aGUgZXhwYW5kQXJyYXlPYmplY3RzIHNldHRpbmcgaXMgc2V0IHRvIHRydWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9jZXNzUmVjb3JkRmllbGREYXRhRm9yRXhwYW5kZWRBcnJheU9iamVjdChyZWNvcmRGaWVsZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkUmVjb3JkRmllbGRWYWx1ZSA9IHV0aWxzLnJlbW92ZUVtcHR5RmllbGRzKHJlY29yZEZpZWxkVmFsdWUpO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGFuIGFycmF5IGFuZCBpdCdzIGVpdGhlciBlbXB0eSBvZiBmdWxsIG9mIGVtcHR5IHZhbHVlcywgdGhlbiB1c2UgYW4gZW1wdHkgdmFsdWUgcmVwcmVzZW50YXRpb25cbiAgICAgICAgaWYgKCFyZWNvcmRGaWVsZFZhbHVlLmxlbmd0aCB8fCAhZmlsdGVyZWRSZWNvcmRGaWVsZFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZW1wdHlGaWVsZFZhbHVlIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpbHRlcmVkUmVjb3JkRmllbGRWYWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgd2UgaGF2ZSBhbiBhcnJheSBvZiBhY3R1YWwgdmFsdWVzLi4uXG4gICAgICAgICAgICAvLyBTaW5jZSB3ZSBhcmUgZXhwYW5kaW5nIGFycmF5IG9iamVjdHMsIHdlIHdpbGwgd2FudCB0byBrZXkgaW4gb24gdmFsdWVzIG9mIG9iamVjdHMuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRSZWNvcmRGaWVsZFZhbHVlWzBdOyAvLyBFeHRyYWN0IHRoZSBzaW5nbGUgdmFsdWUgaW4gdGhlIGFycmF5XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZEZpZWxkVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYWxsIGZpZWxkIHZhbHVlcyBmcm9tIGEgcGFydGljdWxhciByZWNvcmQgZm9yIHRoZSBnaXZlbiBsaXN0IG9mIGZpZWxkc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJldHJpZXZlUmVjb3JkRmllbGREYXRhKHJlY29yZCwgZmllbGRzKSB7XG4gICAgICAgIGNvbnN0IHJlY29yZFZhbHVlcyA9IFtdO1xuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgIGxldCByZWNvcmRGaWVsZFZhbHVlID0gKDAsIGRvY19wYXRoXzEuZXZhbHVhdGVQYXRoKShyZWNvcmQsIGZpZWxkKTtcbiAgICAgICAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQob3B0aW9ucy5lbXB0eUZpZWxkVmFsdWUpICYmIHV0aWxzLmlzRW1wdHlGaWVsZChyZWNvcmRGaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJlY29yZEZpZWxkVmFsdWUgPSBvcHRpb25zLmVtcHR5RmllbGRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZXhwYW5kQXJyYXlPYmplY3RzICYmIEFycmF5LmlzQXJyYXkocmVjb3JkRmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZWNvcmRGaWVsZFZhbHVlID0gcHJvY2Vzc1JlY29yZEZpZWxkRGF0YUZvckV4cGFuZGVkQXJyYXlPYmplY3QocmVjb3JkRmllbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWNvcmRWYWx1ZXMucHVzaChyZWNvcmRGaWVsZFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZWNvcmRWYWx1ZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgcmVjb3JkIGZpZWxkIHZhbHVlIHRvIGl0cyBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWNvcmRGaWVsZFZhbHVlVG9TdHJpbmcoZmllbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBpc0RhdGUgPSBmaWVsZFZhbHVlIGluc3RhbmNlb2YgRGF0ZTsgLy8gc3RvcmUgdG8gYXZvaWQgY2hlY2tpbmcgdHdpY2VcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT09IG51bGwgfHwgQXJyYXkuaXNBcnJheShmaWVsZFZhbHVlKSB8fCB0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ29iamVjdCcgJiYgIWlzRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGZpZWxkVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmaWVsZFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzRGF0ZSAmJiBvcHRpb25zLnVzZURhdGVJc284NjAxRm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS50b0lTT1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICFvcHRpb25zLnVzZUxvY2FsZUZvcm1hdCA/IGZpZWxkVmFsdWUudG9TdHJpbmcoKSA6IGZpZWxkVmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmltcyB0aGUgcmVjb3JkIGZpZWxkIHZhbHVlLCBpZiBzcGVjaWZpZWQgYnkgdGhlIHVzZXIncyBwcm92aWRlZCBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gdHJpbVJlY29yZEZpZWxkVmFsdWUoZmllbGRWYWx1ZSkge1xuICAgICAgICBpZiAob3B0aW9ucy50cmltRmllbGRWYWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUubWFwKHRyaW1SZWNvcmRGaWVsZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmaWVsZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmV2ZW50IENTViBpbmplY3Rpb24gb24gc3RyaW5ncyBpZiBzcGVjaWZpZWQgYnkgdGhlIHVzZXIncyBwcm92aWRlZCBvcHRpb25zLlxuICAgICAqIE1pdGlnYXRpb24gd2lsbCBiZSBkb25lIGJ5IGVuc3VyaW5nIHRoYXQgdGhlIGZpcnN0IGNoYXJhY3RlciBkb2Vzbid0IGJlaW5nIHdpdGg6XG4gICAgICogRXF1YWxzICg9KSwgUGx1cyAoKyksIE1pbnVzICgtKSwgQXQgKEApLCBUYWIgKDB4MDkpLCBDYXJyaWFnZSByZXR1cm4gKDB4MEQpLlxuICAgICAqIE1vcmUgaW5mbzogaHR0cHM6Ly9vd2FzcC5vcmcvd3d3LWNvbW11bml0eS9hdHRhY2tzL0NTVl9JbmplY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmV2ZW50Q3N2SW5qZWN0aW9uKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJldmVudENzdkluamVjdGlvbikge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS5tYXAocHJldmVudENzdkluamVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ3N0cmluZycgJiYgIXV0aWxzLmlzTnVtYmVyKGZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUucmVwbGFjZSgvXls9K1xcLUBcXHRcXHJdKy9nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBxdW90YXRpb24gbWFya3MgaW4gdGhlIGZpZWxkIHZhbHVlLCBpZiBuZWNlc3NhcnksIGFuZCBhcHByb3ByaWF0ZWx5XG4gICAgICogd3JhcHMgdGhlIHJlY29yZCBmaWVsZCB2YWx1ZSBpZiBpdCBjb250YWlucyBhIGNvbW1hIChmaWVsZCBkZWxpbWl0ZXIpLFxuICAgICAqIHF1b3RhdGlvbiBtYXJrICh3cmFwIGRlbGltaXRlciksIG9yIGEgbGluZSBicmVhayAoQ1JMRilcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3cmFwRmllbGRWYWx1ZUlmTmVjZXNzYXJ5KGZpZWxkVmFsdWUpIHtcbiAgICAgICAgY29uc3Qgd3JhcERlbGltaXRlciA9IG9wdGlvbnMuZGVsaW1pdGVyLndyYXA7XG4gICAgICAgIC8vIGVnLiBpbmNsdWRlcyBxdW90YXRpb24gbWFya3MgKGRlZmF1bHQgZGVsaW1pdGVyKVxuICAgICAgICBpZiAoZmllbGRWYWx1ZS5pbmNsdWRlcyhvcHRpb25zLmRlbGltaXRlci53cmFwKSkge1xuICAgICAgICAgICAgLy8gYWRkIGFuIGFkZGl0aW9uYWwgcXVvdGF0aW9uIG1hcmsgYmVmb3JlIGVhY2ggcXVvdGF0aW9uIG1hcmsgYXBwZWFyaW5nIGluIHRoZSBmaWVsZCB2YWx1ZVxuICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUucmVwbGFjZSh3cmFwRGVsaW1pdGVyQ2hlY2tSZWdleCwgd3JhcERlbGltaXRlciArIHdyYXBEZWxpbWl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZSBmaWVsZCBjb250YWlucyBhIGNvbW1hIChmaWVsZCBkZWxpbWl0ZXIpLCBxdW90YXRpb24gbWFyayAod3JhcCBkZWxpbWl0ZXIpLCBsaW5lIGJyZWFrLCBvciBDUkxGXG4gICAgICAgIC8vICAgdGhlbiBlbmNsb3NlIGl0IGluIHF1b3RhdGlvbiBtYXJrcyAod3JhcCBkZWxpbWl0ZXIpXG4gICAgICAgIGlmIChmaWVsZFZhbHVlLmluY2x1ZGVzKG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkKSB8fFxuICAgICAgICAgICAgZmllbGRWYWx1ZS5pbmNsdWRlcyhvcHRpb25zLmRlbGltaXRlci53cmFwKSB8fFxuICAgICAgICAgICAgZmllbGRWYWx1ZS5tYXRjaChjcmxmU2VhcmNoUmVnZXgpIHx8XG4gICAgICAgICAgICBvcHRpb25zLndyYXBCb29sZWFucyAmJiAoZmllbGRWYWx1ZSA9PT0gJ3RydWUnIHx8IGZpZWxkVmFsdWUgPT09ICdmYWxzZScpKSB7XG4gICAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHZhbHVlIGluIGEgd3JhcCBkZWxpbWl0ZXIgKHF1b3RhdGlvbiBtYXJrcyBieSBkZWZhdWx0KVxuICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHdyYXBEZWxpbWl0ZXIgKyBmaWVsZFZhbHVlICsgd3JhcERlbGltaXRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBDU1YgcmVjb3JkIHN0cmluZyBieSBqb2luaW5nIHRoZSBmaWVsZCB2YWx1ZXMgdG9nZXRoZXIgYnkgdGhlIGZpZWxkIGRlbGltaXRlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlQ3N2Um93RnJvbVJlY29yZChyZWNvcmRGaWVsZFZhbHVlcykge1xuICAgICAgICByZXR1cm4gcmVjb3JkRmllbGRWYWx1ZXMuam9pbihvcHRpb25zLmRlbGltaXRlci5maWVsZCk7XG4gICAgfVxuICAgIC8qKiBDU1YgQ09NUE9ORU5UIENPTUJJTkVSL0ZJTkFMIFBST0NFU1NPUiAqKi9cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyB0aGUgZmluYWwgQ1NWIGNvbnN0cnVjdGlvbiBieSBjb21iaW5pbmcgdGhlIGZpZWxkcyBpbiB0aGUgYXBwcm9wcmlhdGVcbiAgICAgKiBvcmRlciBkZXBlbmRpbmcgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMgdmFsdWVzIGFuZCBzZW5kcyB0aGUgZ2VuZXJhdGVkIENTVlxuICAgICAqIGJhY2sgdG8gdGhlIHVzZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUNzdkZyb21Db21wb25lbnRzKHBhcmFtcykge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBwYXJhbXMuaGVhZGVyLCByZWNvcmRzID0gcGFyYW1zLnJlY29yZFN0cmluZywgXG4gICAgICAgIC8vIElmIHdlIGFyZSBwcmVwZW5kaW5nIHRoZSBoZWFkZXIsIHRoZW4gYWRkIGFuIEVPTCwgb3RoZXJ3aXNlIGp1c3QgcmV0dXJuIHRoZSByZWNvcmRzXG4gICAgICAgIGNzdiA9IChvcHRpb25zLmV4Y2VsQk9NID8gY29uc3RhbnRzXzEuZXhjZWxCT00gOiAnJykgK1xuICAgICAgICAgICAgKG9wdGlvbnMucHJlcGVuZEhlYWRlciA/IGhlYWRlciArIG9wdGlvbnMuZGVsaW1pdGVyLmVvbCA6ICcnKSArXG4gICAgICAgICAgICByZWNvcmRzO1xuICAgICAgICByZXR1cm4gY3N2O1xuICAgIH1cbiAgICAvKiogTUFJTiBDT05WRVJURVIgRlVOQ1RJT04gKiovXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWxseSBleHBvcnRlZCBqc29uMmNzdiBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnZlcnQoZGF0YSkge1xuICAgICAgICAvLyBTaW5nbGUgZG9jdW1lbnQsIG5vdCBhbiBhcnJheVxuICAgICAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkgJiYgIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBkYXRhID0gW2RhdGFdOyAvLyBDb252ZXJ0IHRvIGFuIGFycmF5IG9mIHRoZSBnaXZlbiBkb2N1bWVudFxuICAgICAgICB9XG4gICAgICAgIC8vIFJldHJpZXZlIHRoZSBoZWFkaW5nIGFuZCB0aGVuIGdlbmVyYXRlIHRoZSBDU1Ygd2l0aCB0aGUga2V5cyB0aGF0IGFyZSBpZGVudGlmaWVkXG4gICAgICAgIGNvbnN0IGhlYWRlckZpZWxkcyA9IHtcbiAgICAgICAgICAgIGhlYWRlckZpZWxkczogcmV0cmlldmVIZWFkZXJGaWVsZHMoZGF0YSksXG4gICAgICAgICAgICByZWNvcmRzOiBkYXRhLFxuICAgICAgICAgICAgaGVhZGVyOiAnJyxcbiAgICAgICAgICAgIHJlY29yZFN0cmluZzogJycsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVud2luZGVkID0gdW53aW5kUmVjb3Jkc0lmTmVjZXNzYXJ5KGhlYWRlckZpZWxkcyk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZCA9IHByb2Nlc3NSZWNvcmRzKHVud2luZGVkKTtcbiAgICAgICAgY29uc3Qgd3JhcHBlZCA9IHdyYXBIZWFkZXJGaWVsZHMocHJvY2Vzc2VkKTtcbiAgICAgICAgY29uc3QgdHJpbW1lZCA9IHRyaW1IZWFkZXJGaWVsZHMod3JhcHBlZCk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZCA9IGdlbmVyYXRlQ3N2SGVhZGVyKHRyaW1tZWQpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDc3ZGcm9tQ29tcG9uZW50cyhnZW5lcmF0ZWQpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjb252ZXJ0LFxuICAgIH07XG59O1xuZXhwb3J0cy5Kc29uMkNzdiA9IEpzb24yQ3N2O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNzdjJKc29uID0gdm9pZCAwO1xuY29uc3QgZG9jX3BhdGhfMSA9IHJlcXVpcmUoXCJkb2MtcGF0aFwiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuY29uc3QgdXRpbHMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vdXRpbHNcIikpO1xuY29uc3QgQ3N2Mkpzb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGNvbnN0IGVzY2FwZWRXcmFwRGVsaW1pdGVyUmVnZXggPSBuZXcgUmVnRXhwKG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgKyBvcHRpb25zLmRlbGltaXRlci53cmFwLCAnZycpLCBleGNlbEJPTVJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBjb25zdGFudHNfMS5leGNlbEJPTSksIHZhbHVlUGFyc2VyRm4gPSBvcHRpb25zLnBhcnNlVmFsdWUgJiYgdHlwZW9mIG9wdGlvbnMucGFyc2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMucGFyc2VWYWx1ZSA6IEpTT04ucGFyc2U7XG4gICAgLyoqXG4gICAgICogVHJpbXMgdGhlIGhlYWRlciBrZXksIGlmIHNwZWNpZmllZCBieSB0aGUgdXNlciB2aWEgdGhlIHByb3ZpZGVkIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyS2V5KGhlYWRlcktleSkge1xuICAgICAgICBoZWFkZXJLZXkgPSByZW1vdmVXcmFwRGVsaW1pdGVyc0Zyb21WYWx1ZShoZWFkZXJLZXkpO1xuICAgICAgICBpZiAob3B0aW9ucy50cmltSGVhZGVyRmllbGRzKSB7XG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyS2V5LnNwbGl0KCcuJylcbiAgICAgICAgICAgICAgICAubWFwKChjb21wb25lbnQpID0+IGNvbXBvbmVudC50cmltKCkpXG4gICAgICAgICAgICAgICAgLmpvaW4oJy4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVyS2V5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgSlNPTiBoZWFkaW5nIGZyb20gdGhlIENTVlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJldHJpZXZlSGVhZGluZyhsaW5lcykge1xuICAgICAgICBsZXQgaGVhZGVyRmllbGRzID0gW107XG4gICAgICAgIGlmIChvcHRpb25zLmhlYWRlckZpZWxkcykge1xuICAgICAgICAgICAgaGVhZGVyRmllbGRzID0gb3B0aW9ucy5oZWFkZXJGaWVsZHMubWFwKChoZWFkZXJGaWVsZCwgaW5kZXgpID0+ICh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHByb2Nlc3NIZWFkZXJLZXkoaGVhZGVyRmllbGQpLFxuICAgICAgICAgICAgICAgIGluZGV4XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBhbmQgcmV0dXJuIHRoZSBoZWFkaW5nIGtleXNcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IGxpbmVzWzBdO1xuICAgICAgICAgICAgaGVhZGVyRmllbGRzID0gaGVhZGVyUm93Lm1hcCgoaGVhZGVyS2V5LCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcHJvY2Vzc0hlYWRlcktleShoZWFkZXJLZXkpLFxuICAgICAgICAgICAgICAgIGluZGV4XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBwcm92aWRlZCBrZXlzLCBmaWx0ZXIgdGhlIGdlbmVyYXRlZCBrZXlzIHRvIGp1c3QgdGhlIHVzZXIgcHJvdmlkZWQga2V5cyBzbyB3ZSBhbHNvIGhhdmUgdGhlIGtleSBpbmRleFxuICAgICAgICAgICAgaWYgKG9wdGlvbnMua2V5cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBvcHRpb25zLmtleXM7IC8vIFR5cGVTY3JpcHQgdHlwZSBjaGVja2luZyB3b3JrIGFyb3VuZCB0byBnZXQgaXQgdG8gcmVjb2duaXplIHRoZSBvcHRpb24gaXMgbm90IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGhlYWRlckZpZWxkcyA9IGhlYWRlckZpZWxkcy5maWx0ZXIoKGhlYWRlcktleSkgPT4ga2V5cy5pbmNsdWRlcyhoZWFkZXJLZXkudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGluZXMsXG4gICAgICAgICAgICBoZWFkZXJGaWVsZHMsXG4gICAgICAgICAgICByZWNvcmRMaW5lczogW10sXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIEV4Y2VsIEJPTSB2YWx1ZSwgaWYgc3BlY2lmaWVkIGJ5IHRoZSBvcHRpb25zIG9iamVjdFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cmlwRXhjZWxCT00oY3N2KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4Y2VsQk9NKSB7XG4gICAgICAgICAgICByZXR1cm4gY3N2LnJlcGxhY2UoZXhjZWxCT01SZWdleCwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjc3Y7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHNwbGl0cyBhIGxpbmUgc28gdGhhdCB3ZSBjYW4gaGFuZGxlIHdyYXBwZWQgZmllbGRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3BsaXRMaW5lcyhjc3YpIHtcbiAgICAgICAgLy8gUGFyc2Ugb3V0IHRoZSBsaW5lLi4uXG4gICAgICAgIGNvbnN0IGxpbmVzID0gW10sIGxhc3RDaGFyYWN0ZXJJbmRleCA9IGNzdi5sZW5ndGggLSAxLCBlb2xEZWxpbWl0ZXJMZW5ndGggPSBvcHRpb25zLmRlbGltaXRlci5lb2wubGVuZ3RoLCBzdGF0ZVZhcmlhYmxlcyA9IHtcbiAgICAgICAgICAgIGluc2lkZVdyYXBEZWxpbWl0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgcGFyc2luZ1ZhbHVlOiB0cnVlLFxuICAgICAgICAgICAganVzdFBhcnNlZERvdWJsZVF1b3RlOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXJ0SW5kZXg6IDBcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNwbGl0TGluZSA9IFtdLCBjaGFyYWN0ZXIsIGNoYXJCZWZvcmUsIGNoYXJBZnRlciwgbmV4dE5DaGFyLCBpbmRleCA9IDA7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIGNoYXJhY3RlciBpbiB0aGUgbGluZSB0byBpZGVudGlmeSB3aGVyZSB0byBzcGxpdCB0aGUgdmFsdWVzXG4gICAgICAgIHdoaWxlIChpbmRleCA8IGNzdi5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIEN1cnJlbnQgY2hhcmFjdGVyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjc3ZbaW5kZXhdO1xuICAgICAgICAgICAgLy8gUHJldmlvdXMgY2hhcmFjdGVyXG4gICAgICAgICAgICBjaGFyQmVmb3JlID0gaW5kZXggPyBjc3ZbaW5kZXggLSAxXSA6ICcnO1xuICAgICAgICAgICAgLy8gTmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIGNoYXJBZnRlciA9IGluZGV4IDwgbGFzdENoYXJhY3RlckluZGV4ID8gY3N2W2luZGV4ICsgMV0gOiAnJztcbiAgICAgICAgICAgIC8vIE5leHQgbiBjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgY2hhcmFjdGVyLCB3aGVyZSBuID0gbGVuZ3RoKEVPTCBkZWxpbWl0ZXIpXG4gICAgICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3IgdGhlIGNoZWNraW5nIG9mIGFuIEVPTCBkZWxpbWl0ZXIgd2hlbiBpZiBpdCBpcyBtb3JlIHRoYW4gYSBzaW5nbGUgY2hhcmFjdGVyIChlZy4gJ1xcclxcbicpXG4gICAgICAgICAgICBuZXh0TkNoYXIgPSB1dGlscy5nZXROQ2hhcmFjdGVycyhjc3YsIGluZGV4LCBlb2xEZWxpbWl0ZXJMZW5ndGgpO1xuICAgICAgICAgICAgaWYgKChuZXh0TkNoYXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmVvbCAmJiAhc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciB8fFxuICAgICAgICAgICAgICAgIGluZGV4ID09PSBsYXN0Q2hhcmFjdGVySW5kZXgpICYmIGNoYXJCZWZvcmUgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhbiBFT0wgZGVsaW1pdGVyIG9yIHRoZSBlbmQgb2YgdGhlIGNzdiBhbmQgdGhlIHByZXZpb3VzIGNoYXJhY3RlciBpcyBhIGZpZWxkIGRlbGltaXRlci4uLlxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCBpbmRleCBpcyB0aGUgY3VycmVudCBpbmRleCAoYW5kIHNpbmNlIHRoZSBwcmV2aW91cyBjaGFyYWN0ZXIgaXMgYSBjb21tYSksXG4gICAgICAgICAgICAgICAgLy8gICB0aGVuIHRoZSB2YWx1ZSBiZWluZyBwYXJzZWQgaXMgYW4gZW1wdHkgdmFsdWUgYWNjb3JkaW5nbHksIGFkZCBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgICAgICBpZiAobmV4dE5DaGFyID09PSBvcHRpb25zLmRlbGltaXRlci5lb2wgJiYgc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgQ1NWLCB0aGVyZSdzIG5vIG5ldyBsaW5lLCBhbmQgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGlzIGEgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiBhZGQgYW4gZW1wdHkgc3RyaW5nIGZvciB0aGUgY3VycmVudCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBzcGxpdExpbmUucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHRoZXJlJ3MgYSB2YWxpZCB2YWx1ZSwgYW5kIHRoZSBzdGFydCBpbmRleCBpc24ndCB0aGUgY3VycmVudCBpbmRleCwgZ3JhYiB0aGUgd2hvbGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goY3N2LnN1YnN0cmluZyhzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBsYXN0IGNoYXJhY3RlciBpcyBhIGNvbW1hLCB0aGVyZSdzIHN0aWxsIGFuIGFkZGl0aW9uYWwgaW1wbGllZCBmaWVsZCB2YWx1ZSB0cmFpbGluZyB0aGUgY29tbWEuXG4gICAgICAgICAgICAgICAgLy8gICBTaW5jZSB0aGlzIHZhbHVlIGlzIGVtcHR5LCB3ZSBwdXNoIGFuIGV4dHJhIGVtcHR5IHZhbHVlXG4gICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIC8vIEZpbmFsbHksIHB1c2ggdGhlIHNwbGl0IGxpbmUgdmFsdWVzIGludG8gdGhlIGxpbmVzIGFycmF5IGFuZCBjbGVhciB0aGUgc3BsaXQgbGluZVxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goc3BsaXRMaW5lKTtcbiAgICAgICAgICAgICAgICBzcGxpdExpbmUgPSBbXTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4ID0gaW5kZXggKyBlb2xEZWxpbWl0ZXJMZW5ndGg7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gY2hhckFmdGVyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGxhc3RDaGFyYWN0ZXJJbmRleCAmJiBjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2ggdGhlIGVuZCBvZiB0aGUgQ1NWIGFuZCB0aGUgY3VycmVudCBjaGFyYWN0ZXIgaXMgYSBmaWVsZCBkZWxpbWl0ZXJcbiAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgcHJldmlvdXNseSBzZWVuIHZhbHVlIGFuZCBhZGQgaXQgdG8gdGhlIGxpbmVcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IGNzdi5zdWJzdHJpbmcoc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKHBhcnNlZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBUaGVuIGFkZCBhbiBlbXB0eSBzdHJpbmcgdG8gdGhlIGxpbmUgc2luY2UgdGhlIGxhc3QgY2hhcmFjdGVyIGJlaW5nIGEgZmllbGQgZGVsaW1pdGVyIGluZGljYXRlcyBhbiBlbXB0eSBmaWVsZFxuICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHNwbGl0TGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gbGFzdENoYXJhY3RlckluZGV4IHx8IG5leHROQ2hhciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZW9sICYmXG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgYXJlbid0IGluc2lkZSB3cmFwIGRlbGltaXRlcnMgb3IgaWYgd2UgYXJlIGJ1dCB0aGUgY2hhcmFjdGVyIGJlZm9yZSB3YXMgYSB3cmFwIGRlbGltaXRlciBhbmQgd2UgZGlkbid0IGp1c3Qgc2VlIHR3b1xuICAgICAgICAgICAgICAgICghc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciB8fFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyICYmIGNoYXJCZWZvcmUgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgIXN0YXRlVmFyaWFibGVzLmp1c3RQYXJzZWREb3VibGVRdW90ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgaWYgd2UgcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBsaW5lIG9yIGNzdiAoYW5kIGN1cnJlbnQgY2hhcmFjdGVyIGlzIG5vdCBhIGZpZWxkIGRlbGltaXRlcilcbiAgICAgICAgICAgICAgICBjb25zdCB0b0luZGV4ID0gaW5kZXggIT09IGxhc3RDaGFyYWN0ZXJJbmRleCB8fCBjaGFyQmVmb3JlID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwID8gaW5kZXggOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8gUmV0cmlldmUgdGhlIHJlbWFpbmluZyB2YWx1ZSBhbmQgYWRkIGl0IHRvIHRoZSBzcGxpdCBsaW5lIGxpc3Qgb2YgdmFsdWVzXG4gICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goY3N2LnN1YnN0cmluZyhzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4LCB0b0luZGV4KSk7XG4gICAgICAgICAgICAgICAgLy8gRmluYWxseSwgcHVzaCB0aGUgc3BsaXQgbGluZSB2YWx1ZXMgaW50byB0aGUgbGluZXMgYXJyYXkgYW5kIGNsZWFyIHRoZSBzcGxpdCBsaW5lXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChzcGxpdExpbmUpO1xuICAgICAgICAgICAgICAgIHNwbGl0TGluZSA9IFtdO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPSBpbmRleCArIGVvbERlbGltaXRlckxlbmd0aDtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgPSBjaGFyQWZ0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgY2hhckJlZm9yZSA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQgJiZcbiAgICAgICAgICAgICAgICAhc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciAmJiAhc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHdyYXAgZGVsaW1pdGVyIGFmdGVyIGEgY29tbWEgYW5kIHdlIGFyZW4ndCBpbnNpZGUgYSB3cmFwIGRlbGltaXRlclxuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBuZXh0IGNoYXJhY3RlcihzKSBhcmUgYW4gRU9MIGRlbGltaXRlciwgdGhlbiBza2lwIHRoZW0gc28gd2UgZG9uJ3QgcGFyc2Ugd2hhdCB3ZSd2ZSBzZWVuIGFzIGFub3RoZXIgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuZ2V0TkNoYXJhY3RlcnMoY3N2LCBpbmRleCArIDEsIGVvbERlbGltaXRlckxlbmd0aCkgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmVvbCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSBvcHRpb25zLmRlbGltaXRlci5lb2wubGVuZ3RoICsgMTsgLy8gU2tpcCBwYXN0IEVPTFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChjaGFyQmVmb3JlICE9PSBvcHRpb25zLmRlbGltaXRlci53cmFwIHx8IHN0YXRlVmFyaWFibGVzLmp1c3RQYXJzZWREb3VibGVRdW90ZSAmJiBjaGFyQmVmb3JlID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwKSAmJlxuICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiB1dGlscy5nZXROQ2hhcmFjdGVycyhjc3YsIGluZGV4ICsgMSwgZW9sRGVsaW1pdGVyTGVuZ3RoKSA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZW9sKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2ggYSB3cmFwIHdoaWNoIGlzIG5vdCBwcmVjZWRlZCBieSBhIHdyYXAgZGVsaW0gYW5kIHRoZSBuZXh0IGNoYXJhY3RlciBpcyBhbiBFT0wgZGVsaW0gKGllLiAqXCJcXG4pXG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIE5leHQgaXRlcmF0aW9uIHdpbGwgc3Vic3RyaW5nLCBhZGQgdGhlIHZhbHVlIHRvIHRoZSBsaW5lLCBhbmQgcHVzaCB0aGUgbGluZSBvbnRvIHRoZSBhcnJheSBvZiBsaW5lc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmIChpbmRleCA9PT0gMCB8fCB1dGlscy5nZXROQ2hhcmFjdGVycyhjc3YsIGluZGV4IC0gZW9sRGVsaW1pdGVyTGVuZ3RoLCBlb2xEZWxpbWl0ZXJMZW5ndGgpID09PSBvcHRpb25zLmRlbGltaXRlci5lb2wgJiYgIXN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIpKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGxpbmUgc3RhcnRzIHdpdGggYSB3cmFwIGRlbGltaXRlciAoaWUuIFwiKilcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiBjaGFyQWZ0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHdyYXAgZGVsaW1pdGVyIHdpdGggYSBmaWVsZCBkZWxpbWl0ZXIgYWZ0ZXIgaXQgKGllLiAqXCIsKVxuICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKGNzdi5zdWJzdHJpbmcoc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCwgaW5kZXggKyAxKSk7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCA9IGluZGV4ICsgMjsgLy8gbmV4dCB2YWx1ZSBzdGFydHMgYWZ0ZXIgdGhlIGZpZWxkIGRlbGltaXRlclxuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiBjaGFyQmVmb3JlID09PSBvcHRpb25zLmRlbGltaXRlci5maWVsZCAmJlxuICAgICAgICAgICAgICAgICFzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyICYmIHN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSB3cmFwIGRlbGltaXRlciB3aXRoIGEgZmllbGQgZGVsaW1pdGVyIGFmdGVyIGl0IChpZS4gLFwiKilcbiAgICAgICAgICAgICAgICBzcGxpdExpbmUucHVzaChjc3Yuc3Vic3RyaW5nKHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXgsIGluZGV4IC0gMSkpO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmIGNoYXJBZnRlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiBpbmRleCAhPT0gc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJ1biBpbnRvIGFuIGVzY2FwZWQgcXVvdGUgKGllLiBcIlwiKSBza2lwIHBhc3QgdGhlIHNlY29uZCBxdW90ZVxuICAgICAgICAgICAgICAgIGluZGV4ICs9IDI7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuanVzdFBhcnNlZERvdWJsZVF1b3RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQgJiYgY2hhckJlZm9yZSAhPT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJlxuICAgICAgICAgICAgICAgIGNoYXJBZnRlciAhPT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiAhc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciAmJlxuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBmaWVsZCBkZWxpbWl0ZXIgYW5kIGFyZSBub3QgaW5zaWRlIHRoZSB3cmFwIGRlbGltaXRlcnMgKGllLiAqLCopXG4gICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goY3N2LnN1YnN0cmluZyhzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4LCBpbmRleCkpO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkICYmIGNoYXJCZWZvcmUgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiZcbiAgICAgICAgICAgICAgICBjaGFyQWZ0ZXIgIT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgIXN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBmaWVsZCBkZWxpbWl0ZXIsIHRoZSBwcmV2aW91cyBjaGFyYWN0ZXIgd2FzIGEgd3JhcCBkZWxpbWl0ZXIsIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAvLyAgIG5leHQgY2hhcmFjdGVyIGlzIG5vdCBhIHdyYXAgZGVsaW1pdGVyIChpZS4gXCIsKilcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCB0byB0aGUgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgZG91YmxlIHF1b3RlIHN0YXRlIHZhcmlhYmxlXG4gICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5qdXN0UGFyc2VkRG91YmxlUXVvdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgcmVjb3JkIGxpbmVzIGZyb20gdGhlIHNwbGl0IENTViBsaW5lcyBhbmQgc2V0cyBpdCBvbiB0aGUgcGFyYW1zIG9iamVjdFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJldHJpZXZlUmVjb3JkTGluZXMocGFyYW1zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmhlYWRlckZpZWxkcykgeyAvLyBUaGlzIG9wdGlvbiBpcyBwYXNzZWQgZm9yIGluc3RhbmNlcyB3aGVyZSB0aGUgQ1NWIGhhcyBubyBoZWFkZXIgbGluZVxuICAgICAgICAgICAgcGFyYW1zLnJlY29yZExpbmVzID0gcGFyYW1zLmxpbmVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBBbGwgbGluZXMgZXhjZXB0IGZvciB0aGUgaGVhZGVyIGxpbmVcbiAgICAgICAgICAgIHBhcmFtcy5yZWNvcmRMaW5lcyA9IHBhcmFtcy5saW5lcy5zcGxpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSB2YWx1ZSBmb3IgdGhlIHJlY29yZCBmcm9tIHRoZSBsaW5lIGF0IHRoZSBwcm92aWRlZCBrZXkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmV0cmlldmVSZWNvcmRWYWx1ZUZyb21MaW5lKGhlYWRlckZpZWxkLCBsaW5lKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgdmFsdWUgYXQgdGhlIGtleSdzIGluZGV4LCB1c2UgaXQ7IG90aGVyd2lzZSwgbnVsbFxuICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmVbaGVhZGVyRmllbGQuaW5kZXhdO1xuICAgICAgICAvLyBQZXJmb3JtIGFueSBuZWNlc3NhcnkgdmFsdWUgY29udmVyc2lvbnMgb24gdGhlIHJlY29yZCB2YWx1ZVxuICAgICAgICByZXR1cm4gcHJvY2Vzc1JlY29yZFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIHRoZSByZWNvcmQncyB2YWx1ZSBieSBwYXJzaW5nIHRoZSBkYXRhIHRvIGVuc3VyZSB0aGUgQ1NWIGlzXG4gICAgICogY29udmVydGVkIHRvIHRoZSBKU09OIHRoYXQgY3JlYXRlZCBpdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9jZXNzUmVjb3JkVmFsdWUoZmllbGRWYWx1ZSkge1xuICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYW4gYXJyYXkgcmVwcmVzZW50YXRpb24sIGNvbnZlcnQgaXRcbiAgICAgICAgY29uc3QgcGFyc2VkSnNvbiA9IHBhcnNlVmFsdWUoZmllbGRWYWx1ZSk7XG4gICAgICAgIC8vIElmIHBhcnNlZEpzb24gaXMgYW55dGhpbmcgYXNpZGUgZnJvbSBhbiBlcnJvciwgdGhlbiB3ZSB3YW50IHRvIHVzZSB0aGUgcGFyc2VkIHZhbHVlXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIHVzIHRvIGludGVycHJldCB2YWx1ZXMgbGlrZSAnbnVsbCcgLS0+IG51bGwsICdmYWxzZScgLS0+IGZhbHNlXG4gICAgICAgIGlmICghdXRpbHMuaXNFcnJvcihwYXJzZWRKc29uKSAmJiAhdXRpbHMuaXNJbnZhbGlkKHBhcnNlZEpzb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkSnNvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaWVsZFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpbXMgdGhlIHJlY29yZCB2YWx1ZSwgaWYgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyIHZpYSB0aGUgb3B0aW9ucyBvYmplY3RcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmltUmVjb3JkVmFsdWUoZmllbGRWYWx1ZSkge1xuICAgICAgICBpZiAob3B0aW9ucy50cmltRmllbGRWYWx1ZXMgJiYgZmllbGRWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUudHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBKU09OIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIGtleXMgKGRlc2lnbmF0ZWQgYnkgdGhlIENTViBoZWFkZXIpXG4gICAgICogICBhbmQgdGhlIHZhbHVlcyAoZnJvbSB0aGUgZ2l2ZW4gbGluZSlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBjcmVhdGVkIGpzb24gZG9jdW1lbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudChoZWFkZXJGaWVsZHMsIGxpbmUpIHtcbiAgICAgICAgLy8gUmVkdWNlIHRoZSBrZXlzIGludG8gYSBKU09OIGRvY3VtZW50IHJlcHJlc2VudGluZyB0aGUgZ2l2ZW4gbGluZVxuICAgICAgICByZXR1cm4gaGVhZGVyRmllbGRzLnJlZHVjZSgoZG9jdW1lbnQsIGhlYWRlckZpZWxkKSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHZhbHVlIGF0IHRoZSBrZXkncyBpbmRleCBpbiB0aGUgbGluZSwgc2V0IHRoZSB2YWx1ZTsgb3RoZXJ3aXNlIG51bGxcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcmV0cmlldmVSZWNvcmRWYWx1ZUZyb21MaW5lKGhlYWRlckZpZWxkLCBsaW5lKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCB0aGUga2V5IGFuZCB2YWx1ZSB0byB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICByZXR1cm4gKDAsIGRvY19wYXRoXzEuc2V0UGF0aCkoZG9jdW1lbnQsIGhlYWRlckZpZWxkLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBDYXRjaCBhbnkgZXJyb3JzIHdoZXJlIGtleSBwYXRocyBhcmUgbnVsbCBvciAnJyBhbmQgY29udGludWVcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgb3V0ZXJtb3N0IHdyYXAgZGVsaW1pdGVycyBmcm9tIGEgdmFsdWUsIGlmIHRoZXkgYXJlIHByZXNlbnRcbiAgICAgKiBPdGhlcndpc2UsIHRoZSBub24td3JhcHBlZCB2YWx1ZSBpcyByZXR1cm5lZCBhcyBpc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBEZWxpbWl0ZXJzRnJvbVZhbHVlKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyID0gZmllbGRWYWx1ZVswXSwgbGFzdEluZGV4ID0gZmllbGRWYWx1ZS5sZW5ndGggLSAxLCBsYXN0Q2hhciA9IGZpZWxkVmFsdWVbbGFzdEluZGV4XTtcbiAgICAgICAgLy8gSWYgdGhlIGZpZWxkIHN0YXJ0cyBhbmQgZW5kcyB3aXRoIGEgd3JhcCBkZWxpbWl0ZXJcbiAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiBsYXN0Q2hhciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBmaWVsZCBpcyBqdXN0IGEgcGFpciBvZiB3cmFwIGRlbGltaXRlcnMgXG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS5sZW5ndGggPD0gMiA/ICcnIDogZmllbGRWYWx1ZS5zdWJzdHJpbmcoMSwgbGFzdEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5lc2NhcGVzIHdyYXAgZGVsaW1pdGVycyBieSByZXBsYWNpbmcgZHVwbGljYXRlcyB3aXRoIGEgc2luZ2xlIChlZy4gXCJcIiAtPiBcIilcbiAgICAgKiBUaGlzIGlzIGRvbmUgaW4gb3JkZXIgdG8gcGFyc2UgUkZDIDQxODAgY29tcGxpYW50IENTViBiYWNrIHRvIEpTT05cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bmVzY2FwZVdyYXBEZWxpbWl0ZXJJbkZpZWxkKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUucmVwbGFjZShlc2NhcGVkV3JhcERlbGltaXRlclJlZ2V4LCBvcHRpb25zLmRlbGltaXRlci53cmFwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFpbiBoZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCB0aGUgQ1NWIHRvIHRoZSBKU09OIGRvY3VtZW50IGFycmF5XG4gICAgICovXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtUmVjb3JkTGluZXMocGFyYW1zKSB7XG4gICAgICAgIC8vIEZvciBlYWNoIGxpbmUsIGNyZWF0ZSB0aGUgZG9jdW1lbnQgYW5kIGFkZCBpdCB0byB0aGUgYXJyYXkgb2YgZG9jdW1lbnRzXG4gICAgICAgIHJldHVybiBwYXJhbXMucmVjb3JkTGluZXMucmVkdWNlKChnZW5lcmF0ZWRKc29uT2JqZWN0cywgbGluZSkgPT4ge1xuICAgICAgICAgICAgbGluZSA9IGxpbmUubWFwKChmaWVsZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUGVyZm9ybSB0aGUgbmVjZXNzYXJ5IG9wZXJhdGlvbnMgb24gZWFjaCBsaW5lXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHJlbW92ZVdyYXBEZWxpbWl0ZXJzRnJvbVZhbHVlKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSB1bmVzY2FwZVdyYXBEZWxpbWl0ZXJJbkZpZWxkKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSB0cmltUmVjb3JkVmFsdWUoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlZERvY3VtZW50ID0gY3JlYXRlRG9jdW1lbnQocGFyYW1zLmhlYWRlckZpZWxkcywgbGluZSk7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSnNvbk9iamVjdHMuY29uY2F0KGdlbmVyYXRlZERvY3VtZW50KTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBwYXJzZSB0aGUgcHJvdmlkZWQgdmFsdWUuIElmIGl0IGlzIG5vdCBwYXJzYWJsZSwgdGhlbiBhbiBlcnJvciBpcyByZXR1cm5lZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZ1JlcHJlc2VudGF0aW9uKHZhbHVlLCBvcHRpb25zKSAmJiAhdXRpbHMuaXNEYXRlUmVwcmVzZW50YXRpb24odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGFyc2VkSnNvbiA9IHZhbHVlUGFyc2VyRm4odmFsdWUpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHBhcnNlZCB2YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB3ZSBhbHNvIG5lZWQgdG8gdHJpbSByZWNvcmQgdmFsdWVzLCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcnNlZEpzb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEpzb24ubWFwKHRyaW1SZWNvcmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkSnNvbjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludGVybmFsbHkgZXhwb3J0ZWQgY3N2Mmpzb24gZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb252ZXJ0KGRhdGEpIHtcbiAgICAgICAgLy8gU3BsaXQgdGhlIENTViBpbnRvIGxpbmVzIHVzaW5nIHRoZSBzcGVjaWZpZWQgRU9MIG9wdGlvblxuICAgICAgICBjb25zdCBzdHJpcHBlZCA9IHN0cmlwRXhjZWxCT00oZGF0YSk7XG4gICAgICAgIGNvbnN0IHNwbGl0ID0gc3BsaXRMaW5lcyhzdHJpcHBlZCk7XG4gICAgICAgIGNvbnN0IGhlYWRpbmcgPSByZXRyaWV2ZUhlYWRpbmcoc3BsaXQpOyAvLyBSZXRyaWV2ZSB0aGUgaGVhZGluZ3MgZnJvbSB0aGUgQ1NWLCB1bmxlc3MgdGhlIHVzZXIgc3BlY2lmaWVkIHRoZSBrZXlzXG4gICAgICAgIGNvbnN0IGxpbmVzID0gcmV0cmlldmVSZWNvcmRMaW5lcyhoZWFkaW5nKTsgLy8gUmV0cmlldmUgdGhlIHJlY29yZCBsaW5lcyBmcm9tIHRoZSBDU1ZcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVJlY29yZExpbmVzKGxpbmVzKTsgLy8gUmV0cmlldmUgdGhlIEpTT04gZG9jdW1lbnQgYXJyYXlcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udmVydCxcbiAgICB9O1xufTtcbmV4cG9ydHMuQ3N2Mkpzb24gPSBDc3YySnNvbjtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3N2Mmpzb24gPSBleHBvcnRzLmpzb24yY3N2ID0gdm9pZCAwO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XG5jb25zdCBqc29uMmNzdl8xID0gcmVxdWlyZShcIi4vanNvbjJjc3ZcIik7XG5jb25zdCBjc3YyanNvbl8xID0gcmVxdWlyZShcIi4vY3N2Mmpzb25cIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5mdW5jdGlvbiBqc29uMmNzdihkYXRhLCBvcHRpb25zKSB7XG4gICAgY29uc3QgYnVpbHRPcHRpb25zID0gKDAsIHV0aWxzXzEuYnVpbGRKMkNPcHRpb25zKShvcHRpb25zID8/IHt9KTtcbiAgICAvLyBWYWxpZGF0ZSB0aGUgcGFyYW1ldGVycyBiZWZvcmUgY2FsbGluZyB0aGUgY29udmVydGVyJ3MgY29udmVydCBmdW5jdGlvblxuICAgICgwLCB1dGlsc18xLnZhbGlkYXRlKShkYXRhLCB1dGlsc18xLmlzT2JqZWN0LCBjb25zdGFudHNfMS5lcnJvcnMuanNvbjJjc3YpO1xuICAgIHJldHVybiAoMCwganNvbjJjc3ZfMS5Kc29uMkNzdikoYnVpbHRPcHRpb25zKS5jb252ZXJ0KGRhdGEpO1xufVxuZXhwb3J0cy5qc29uMmNzdiA9IGpzb24yY3N2O1xuZnVuY3Rpb24gY3N2Mmpzb24oZGF0YSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGJ1aWx0T3B0aW9ucyA9ICgwLCB1dGlsc18xLmJ1aWxkQzJKT3B0aW9ucykob3B0aW9ucyA/PyB7fSk7XG4gICAgLy8gVmFsaWRhdGUgdGhlIHBhcmFtZXRlcnMgYmVmb3JlIGNhbGxpbmcgdGhlIGNvbnZlcnRlcidzIGNvbnZlcnQgZnVuY3Rpb25cbiAgICAoMCwgdXRpbHNfMS52YWxpZGF0ZSkoZGF0YSwgdXRpbHNfMS5pc1N0cmluZywgY29uc3RhbnRzXzEuZXJyb3JzLmNzdjJqc29uKTtcbiAgICByZXR1cm4gKDAsIGNzdjJqc29uXzEuQ3N2Mkpzb24pKGJ1aWx0T3B0aW9ucykuY29udmVydChkYXRhKTtcbn1cbmV4cG9ydHMuY3N2Mmpzb24gPSBjc3YyanNvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgdXNlTm90aWNlLCB1c2VSZWNvcmRzIH0gZnJvbSBcImFkbWluanNcIjtcclxuaW1wb3J0IHsganNvbjJjc3YgfSBmcm9tIFwianNvbi0yLWNzdlwiO1xyXG5cclxuY29uc3QgRXhwb3J0QnV0dG9uID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZXNvdXJjZSB9ID0gcHJvcHM7XHJcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XHJcbiAgY29uc3QgeyByZWNvcmRzIH0gPSB1c2VSZWNvcmRzKHJlc291cmNlLmlkKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAocmVjb3JkcyAmJiByZWNvcmRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSByZWNvcmRzLm1hcCgocmVjb3JkLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaXRlbSA9IHJlY29yZC5wYXJhbXM7XHJcbiAgICAgICAgICBjb25zdCBtZW1iZXJPYmplY3QgPSB7IC4uLml0ZW0gfTtcclxuICAgICAgICAgIGRlbGV0ZSBtZW1iZXJPYmplY3QuX2lkO1xyXG5cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFNOOiBpbmRleCArIDEsXHJcbiAgICAgICAgICAgIFwiRnVsbCBOYW1lXCI6IGAke2l0ZW0uZmlyc3RfbmFtZX0gJHtpdGVtLmxhc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAuLi5tZW1iZXJPYmplY3QsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjc3YgPSBqc29uMmNzdihyZXN1bHQpO1xyXG4gICAgICAgIGNvbnN0IHV0ZjhCb20gPSBcIlxcdUZFRkZcIjtcclxuICAgICAgICBjb25zdCBjc3ZXaXRoQm9tID0gdXRmOEJvbSArIGNzdjtcclxuXHJcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbm93XHJcbiAgICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge1xyXG4gICAgICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICBtb250aDogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXEQvZywgXCJfXCIpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBub3dcclxuICAgICAgICAgIC50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCB7XHJcbiAgICAgICAgICAgIGhvdXIxMjogZmFsc2UsXHJcbiAgICAgICAgICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXEQvZywgXCJfXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGBleHBvcnRfJHtmb3JtYXR0ZWREYXRlfV90aW1lXyR7Zm9ybWF0dGVkVGltZX0uY3N2YDtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgQmxvYiBmcm9tIHRoZSBDU1YgZGF0YVxyXG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2V2l0aEJvbV0sIHtcclxuICAgICAgICAgIHR5cGU6IFwidGV4dC9jc3Y7Y2hhcnNldD11dGYtODtcIixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbGluayBlbGVtZW50LCBoaWRlIGl0LCBkaXJlY3QgaXQgdG93YXJkcyB0aGUgYmxvYiwgYW5kIHRoZW4gdHJpZ2dlciBhIGNsaWNrXHJcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgIGlmIChsaW5rLmRvd25sb2FkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcclxuICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgZmlsZU5hbWUpO1xyXG4gICAgICAgICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiBcIkV4cG9ydCBzdWNjZXNzZnVsXCIsIHR5cGU6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgICBtZXNzYWdlOiBcIk5vIGRhdGEgZm91bmQgaW4gdGhlIGNvbGxlY3Rpb24uIFNraXBwaW5nIENTViBnZW5lcmF0aW9uLlwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbmZvXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFeHBvcnQgZmFpbGVkOlwiLCBlcnJvcik7XHJcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IFwiRXhwb3J0IGZhaWxlZFwiLCB0eXBlOiBcImVycm9yXCIgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIDxCdXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9PkV4cG9ydCBDU1Y8L0J1dHRvbj47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBvcnRCdXR0b247XHJcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQXBwcm92ZU1lbWJlciBmcm9tICcuLi9hcGkvQXBwcm92ZU1lbWJlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQXBwcm92ZU1lbWJlciA9IEFwcHJvdmVNZW1iZXJcbmltcG9ydCBSZWplY3RNZW1iZXIgZnJvbSAnLi4vYXBpL1JlamVjdE1lbWJlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVqZWN0TWVtYmVyID0gUmVqZWN0TWVtYmVyXG5pbXBvcnQgRXhwb3J0QnV0dG9uIGZyb20gJy4uL2FwaS9FeHBvcnRCdXR0b24nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkV4cG9ydEJ1dHRvbiA9IEV4cG9ydEJ1dHRvblxuaW1wb3J0IFVwbG9hZEVkaXRDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZEVkaXRDb21wb25lbnQgPSBVcGxvYWRFZGl0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkTGlzdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkTGlzdENvbXBvbmVudCA9IFVwbG9hZExpc3RDb21wb25lbnRcbmltcG9ydCBVcGxvYWRTaG93Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRTaG93Q29tcG9uZW50ID0gVXBsb2FkU2hvd0NvbXBvbmVudCJdLCJuYW1lcyI6WyJpc1VuZGVmaW5lZCIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc09iamVjdCIsInV0aWxzIiwicHJvdG90eXBlIiwiZW5jb2RlIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJkZWZhdWx0cyIsIkF4aW9zSGVhZGVycyIsInZhbGlkYXRvcnMiLCJBeGlvcyIsIkNhbmNlbFRva2VuIiwiSHR0cFN0YXR1c0NvZGUiLCJBcHByb3ZlTWVtYmVyIiwicHJvcHMiLCJhcGlfdXJsIiwicmVjb3JkIiwicmVzb3VyY2UiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJ0YXJnZXQiLCJhcHBlbmQiLCJyZXMiLCJheGlvcyIsInB1dCIsInBhcmFtcyIsIl9pZCIsImhlYWRlcnMiLCJjZXJ0aWZpY2F0ZSIsImRhdGEiLCJtZW1iZXJzaGlwX2NlcnRpZmljYXRlIiwiY2VydGlmaWNhdGVVcmwiLCJlbWFpbERhdGEiLCJ0byIsImVtYWlsIiwic3ViamVjdCIsInRleHQiLCJwb3N0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJhbGVydCIsInJlc3BvbnNlIiwibWVzc2FnZSIsImhhbmRsZUFwcHJvdmUiLCJpZCIsInJlZGlyZWN0VXJsIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwidmFyaWFudCIsIndpZHRoIiwicCIsIm0iLCJtdCIsImlzTmV3Iiwib25TdWJtaXQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsImh0bWxGb3IiLCJJbnB1dCIsIm5hbWUiLCJwbGFjZWhvbGRlciIsInJlcXVpcmVkIiwidHlwZSIsImFjY2VwdCIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJSZWplY3RNZW1iZXIiLCJ0aGVuIiwiVGV4dEFyZWEiLCJ1bmlxdWUiLCJmbGF0dGVuIiwidGhpcyIsInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwiZG9jX3BhdGhfMSIsImNvbnN0YW50c18xIiwiX19jcmVhdGVCaW5kaW5nIiwiX19zZXRNb2R1bGVEZWZhdWx0IiwiX19pbXBvcnRTdGFyIiwianNvbjJjc3YiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsImNzdjJqc29uIiwiRXhwb3J0QnV0dG9uIiwiYWRkTm90aWNlIiwidXNlTm90aWNlIiwicmVjb3JkcyIsInVzZVJlY29yZHMiLCJoYW5kbGVDbGljayIsImxlbmd0aCIsInJlc3VsdCIsIm1hcCIsImluZGV4IiwiaXRlbSIsIm1lbWJlck9iamVjdCIsIlNOIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImNzdiIsInV0ZjhCb20iLCJjc3ZXaXRoQm9tIiwibm93IiwiRGF0ZSIsImZvcm1hdHRlZERhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkYXkiLCJtb250aCIsInllYXIiLCJyZXBsYWNlIiwiZm9ybWF0dGVkVGltZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImhvdXIxMiIsImhvdXIiLCJtaW51dGUiLCJmaWxlTmFtZSIsImJsb2IiLCJsaW5rIiwiZG9jdW1lbnQiLCJkb3dubG9hZCIsInVuZGVmaW5lZCIsInVybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwidmlzaWJpbGl0eSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJjb25zb2xlIiwidXNlVHJhbnNsYXRpb24iLCJmbGF0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJEcm9wWm9uZSIsIkRyb3Bab25lSXRlbSIsIkljb24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFFZSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO0VBQzFDLEVBQUUsT0FBTyxTQUFTLElBQUksR0FBRztFQUN6QixJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7RUFDeEMsR0FBRyxDQUFDO0VBQ0o7O0VDRkE7QUFDQTtFQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0VBQ3BDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDaEM7RUFDQSxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUk7RUFDbEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztFQUN2RSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3hCO0VBQ0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEtBQUs7RUFDN0IsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0VBQzVCLEVBQUUsT0FBTyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSTtFQUMxQyxFQUFDO0FBQ0Q7RUFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQztBQUMxRDtFQUNBO0VBQ0E7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QUksRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0VBQzFLLEVBQUM7QUFDRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEM7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQztFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFDO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBS0EsVUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEU7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxLQUFLO0VBQzlCLEVBQUUsSUFBSSxJQUFJLENBQUM7RUFDWCxFQUFFLE9BQU8sS0FBSztFQUNkLElBQUksQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLElBQUksS0FBSyxZQUFZLFFBQVE7RUFDaEUsTUFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztFQUM5QixRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxVQUFVO0VBQzdDO0VBQ0EsU0FBUyxJQUFJLEtBQUssUUFBUSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxL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R0FBRyxLQUFLLENBQUM7RUFDL0IsSUFBSSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBR3NGLHNCQUFjLEVBQUUsQ0FBQztFQUNuRCxJQUFJLFFBQVF0RixzQkFBSyxDQUFDLGFBQWEsQ0FBQ1Usc0JBQVMsRUFBRSxJQUFJO0VBQy9DLFFBQVFWLHNCQUFLLENBQUMsYUFBYSxDQUFDVyxrQkFBSyxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNoRyxRQUFRWCxzQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO0VBQ2pFLENBQUM7O0VDVkQ2RixPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFLENBQUE7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDbkksYUFBYSxHQUFHQSxhQUFhLENBQUE7RUFFcERrSSxPQUFPLENBQUNDLGNBQWMsQ0FBQ3pFLFlBQVksR0FBR0EsWUFBWSxDQUFBO0VBRWxEd0UsT0FBTyxDQUFDQyxjQUFjLENBQUN4RCxZQUFZLEdBQUdBLFlBQVksQ0FBQTtFQUVsRHVELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDQyxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtFQUVoRUYsT0FBTyxDQUFDQyxjQUFjLENBQUNFLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0VBRWhFSCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0csbUJBQW1CLEdBQUdBLElBQW1COzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNTgsNTksNjEsNjIsNjMsNjQsNjVdfQ==
