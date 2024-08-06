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
    }, "Membershippp Number"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vYXBpL0FwcHJvdmVNZW1iZXIudHN4IiwiLi4vYXBpL1JlamVjdE1lbWJlci50c3giLCIuLi9ub2RlX21vZHVsZXMvanNvbi0yLWNzdi9saWIvY29uc3RhbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RvYy1wYXRoL2xpYi9wYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RlZWtzL2xpYi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kZWVrcy9saWIvdHlwZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVla3MvbGliL2RlZWtzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL2pzb24yY3N2LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL2NzdjJqc29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2pzb24tMi1jc3YvbGliL2NvbnZlcnRlci5qcyIsIi4uL2FwaS9FeHBvcnRCdXR0b24uanN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL3R5cGVzL21pbWUtdHlwZXMudHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUpO1xuICB9IDogZW5jb2RlO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGNvbnN0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgdGltZXIgPSBudWxsO1xuICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIGNvbnN0IGZvcmNlID0gdGhpcyA9PT0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKGZvcmNlIHx8IG5vdyAtIHRpbWVzdGFtcCA+IHRocmVzaG9sZCkge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpZiAoIXRpbWVyKSB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSwgdGhyZXNob2xkIC0gKG5vdyAtIHRpbWVzdGFtcCkpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0cyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICBsZXQgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHByb2dyZXNzRXZlbnRSZWR1Y2VyIGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBsZXQge3Jlc3BvbnNlVHlwZX0gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIF9jb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBfY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBfY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBfY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKF9jb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIF9jb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihfY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICBsZXQgYWJvcnRlZDtcblxuICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKGNhbmNlbCkge1xuICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgY29uc3QgZXJyID0gY2FuY2VsIGluc3RhbmNlb2YgRXJyb3IgPyBjYW5jZWwgOiB0aGlzLnJlYXNvbjtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvciA/IGVyciA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgfSwgdGltZW91dClcblxuICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICBpZiAoc2lnbmFscykge1xuICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICBzaWduYWwgJiZcbiAgICAgICAgKHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyID8gc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkgOiBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkpO1xuICAgICAgfSk7XG4gICAgICBzaWduYWxzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG5cbiAgcmV0dXJuIFtzaWduYWwsICgpID0+IHtcbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgfV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgdHlwZTogJ2J5dGVzJyxcblxuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGJ5dGVzICs9IGxlbik7XG4gICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIG9uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gXCIuLi9wbGF0Zm9ybS9pbmRleC5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gXCIuLi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzXCI7XG5pbXBvcnQge3RyYWNrU3RyZWFtfSBmcm9tIFwiLi4vaGVscGVycy90cmFja1N0cmVhbS5qc1wiO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi4vY29yZS9BeGlvc0hlYWRlcnMuanNcIjtcbmltcG9ydCBwcm9ncmVzc0V2ZW50UmVkdWNlciBmcm9tIFwiLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qc1wiO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuaW1wb3J0IHNldHRsZSBmcm9tIFwiLi4vY29yZS9zZXR0bGUuanNcIjtcblxuY29uc3QgZmV0Y2hQcm9ncmVzc0RlY29yYXRvciA9ICh0b3RhbCwgZm4pID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG4gIHJldHVybiAobG9hZGVkKSA9PiBzZXRUaW1lb3V0KCgpID0+IGZuKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSk7XG59XG5cbmNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgdHlwZW9mIFJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXG4vLyB1c2VkIG9ubHkgaW5zaWRlIHRoZSBmZXRjaCBhZGFwdGVyXG5jb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAoKGVuY29kZXIpID0+IChzdHIpID0+IGVuY29kZXIuZW5jb2RlKHN0cikpKG5ldyBUZXh0RW5jb2RlcigpKSA6XG4gICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlc3BvbnNlKHN0cikuYXJyYXlCdWZmZXIoKSlcbik7XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgKCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pKCk7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgISEoKCk9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KTtcbiAgfSBjYXRjaChlcnIpIHtcbiAgICAvLyByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn0pKCk7XG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMuaXNGdW5jdGlvbihyZXNbdHlwZV0pID8gKHJlcykgPT4gcmVzW3R5cGVdKCkgOlxuICAgICAgKF8sIGNvbmZpZykgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cblxuICBpZih1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBuZXcgUmVxdWVzdChib2R5KS5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICBib2R5ID0gYm9keSArICcnO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn1cblxuY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgW2NvbXBvc2VkU2lnbmFsLCBzdG9wVGltZW91dF0gPSAoc2lnbmFsIHx8IGNhbmNlbFRva2VuIHx8IHRpbWVvdXQpID9cbiAgICBjb21wb3NlU2lnbmFscyhbc2lnbmFsLCBjYW5jZWxUb2tlbl0sIHRpbWVvdXQpIDogW107XG5cbiAgbGV0IGZpbmlzaGVkLCByZXF1ZXN0O1xuXG4gIGNvbnN0IG9uRmluaXNoID0gKCkgPT4ge1xuICAgICFmaW5pc2hlZCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG5cbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gIH1cblxuICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICBvblVwbG9hZFByb2dyZXNzICYmIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICApIHtcbiAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIlxuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpXG4gICAgICAgICksIG51bGwsIGVuY29kZVRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2NvcnMnIDogJ29taXQnO1xuICAgIH1cblxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgd2l0aENyZWRlbnRpYWxzXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcblxuICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICBpZiAoc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAob25Eb3dubG9hZFByb2dyZXNzIHx8IGlzU3RyZWFtUmVzcG9uc2UpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uRG93bmxvYWRQcm9ncmVzcyAmJiBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpXG4gICAgICAgICksIGlzU3RyZWFtUmVzcG9uc2UgJiYgb25GaW5pc2gsIGVuY29kZVRleHQpLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuXG4gICAgc3RvcFRpbWVvdXQgJiYgc3RvcFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgb25GaW5pc2goKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS43LjJcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBCb3gsIEZvcm1Hcm91cCwgTGFiZWwsIElucHV0LCBCdXR0b24gfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IEFjdGlvblByb3BzIH0gZnJvbSBcImFkbWluanNcIjtcclxuXHJcbmNvbnN0IEFwcHJvdmVNZW1iZXIgPSAocHJvcHM6IEFjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgYXBpX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQgYXMgSFRNTEZvcm1FbGVtZW50KTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcImlzQXBwcm92ZWRcIiwgXCJ0cnVlXCIpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLnB1dChcclxuICAgICAgICBgJHthcGlfdXJsfS9hcGkvbWVtYmVycy8ke3JlY29yZD8ucGFyYW1zLl9pZH1gLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYWRtaW4vcmVzb3VyY2VzL01lbWJlclwiO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJpc0FwcHJvdmVkXCIsIFwidHJ1ZVwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICAgIGAke2FwaV91cmx9L2FkbWluL2FwaS9yZXNvdXJjZXMvJHtyZXNvdXJjZS5pZH0vcmVjb3Jkcy8ke3JlY29yZD8ucGFyYW1zLl9pZH0vZWRpdGAsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzLmRhdGEucmVkaXJlY3RVcmw7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhbGVydChcIkFuIGVycm9yIG9jY3VycmVkOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHdpZHRoPXsxIC8gMn0gcD1cImxnXCIgbT1cImF1dG9cIiBtdD1cInh4bFwiPlxyXG4gICAgICB7cmVjb3JkPy5wYXJhbXMuaXNOZXcgPyAoXHJcbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cIm1lbWJlcnNoaXBfbnVtYmVyXCI+TWVtYmVyc2hpcHBwIE51bWJlcjwvTGFiZWw+XHJcbiAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgIGlkPVwibWVtYmVyc2hpcF9udW1iZXJcIlxyXG4gICAgICAgICAgICAgIG5hbWU9XCJtZW1iZXJzaGlwX251bWJlclwiXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBtZW1iZXJzaGlwIG51bWJlclwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwibWVtYmVyc2hpcF9jZXJ0aWZpY2F0ZVwiPlxyXG4gICAgICAgICAgICAgIE1lbWJlcnNoaXAgQ2VydGlmaWNhdGVcclxuICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgaWQ9XCJtZW1iZXJzaGlwX2NlcnRpZmljYXRlXCJcclxuICAgICAgICAgICAgICBuYW1lPVwibWVtYmVyc2hpcF9jZXJ0aWZpY2F0ZVwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLyosIGFwcGxpY2F0aW9uL3BkZlwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG10PVwibWRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgIFN1Ym1pdFxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBtdD1cIm1kXCIgb25DbGljaz17aGFuZGxlQXBwcm92ZX0+XHJcbiAgICAgICAgICBDb25maXJtIEFwcHJvdmVcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgKX1cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHByb3ZlTWVtYmVyO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgQm94LFxyXG4gIEZvcm1Hcm91cCxcclxuICBMYWJlbCxcclxuICBUZXh0QXJlYSxcclxuICBCdXR0b24sXHJcbn0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgQWN0aW9uUHJvcHMgfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5jb25zdCBSZWplY3RNZW1iZXIgPSAocHJvcHM6IEFjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgYXBpX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudDogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgYXhpb3NcclxuICAgICAgLnBvc3QoXHJcbiAgICAgICAgYCR7YXBpX3VybH0vYWRtaW4vYXBpL3Jlc291cmNlcy8ke3Jlc291cmNlLmlkfS9yZWNvcmRzLyR7cmVjb3JkPy5wYXJhbXMuX2lkfS9kZWxldGVgXHJcbiAgICAgIClcclxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7YXBpX3VybH0vYWRtaW4vcmVzb3VyY2VzLyR7cmVzb3VyY2UuaWR9YDtcclxuICAgICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgd2lkdGg9ezEgLyAyfSBwPVwibGdcIiBtPVwiYXV0b1wiIG10PVwieHhsXCI+XHJcbiAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cInJlamVjdGlvbl9tZXNzYWdlXCI+UmVqZWN0aW9uIE1lc3NhZ2U8L0xhYmVsPlxyXG4gICAgICAgICAgPFRleHRBcmVhXHJcbiAgICAgICAgICAgIGlkPVwicmVqZWN0aW9uX21lc3NhZ2VcIlxyXG4gICAgICAgICAgICBuYW1lPVwicmVqZWN0aW9uX21lc3NhZ2VcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHJlamVjdGlvbiBtZXNzYWdlXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG10PVwibWRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICBTdWJtaXRcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlamVjdE1lbWJlcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leGNlbEJPTSA9IGV4cG9ydHMuZGVmYXVsdENzdjJKc29uT3B0aW9ucyA9IGV4cG9ydHMuZGVmYXVsdEpzb24yQ3N2T3B0aW9ucyA9IGV4cG9ydHMuZXJyb3JzID0gdm9pZCAwO1xuZXhwb3J0cy5lcnJvcnMgPSB7XG4gICAgb3B0aW9uc1JlcXVpcmVkOiAnT3B0aW9ucyB3ZXJlIG5vdCBwYXNzZWQgYW5kIGFyZSByZXF1aXJlZC4nLFxuICAgIGpzb24yY3N2OiB7XG4gICAgICAgIGNhbm5vdENhbGxPbjogJ0Nhbm5vdCBjYWxsIGpzb24yY3N2IG9uJyxcbiAgICAgICAgZGF0YUNoZWNrRmFpbHVyZTogJ0RhdGEgcHJvdmlkZWQgd2FzIG5vdCBhbiBhcnJheSBvZiBkb2N1bWVudHMuJyxcbiAgICAgICAgbm90U2FtZVNjaGVtYTogJ05vdCBhbGwgZG9jdW1lbnRzIGhhdmUgdGhlIHNhbWUgc2NoZW1hLidcbiAgICB9LFxuICAgIGNzdjJqc29uOiB7XG4gICAgICAgIGNhbm5vdENhbGxPbjogJ0Nhbm5vdCBjYWxsIGNzdjJqc29uIG9uJyxcbiAgICAgICAgZGF0YUNoZWNrRmFpbHVyZTogJ0NTViBpcyBub3QgYSBzdHJpbmcuJ1xuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHRKc29uMkNzdk9wdGlvbnMgPSB7XG4gICAgYXJyYXlJbmRleGVzQXNLZXlzOiBmYWxzZSxcbiAgICBjaGVja1NjaGVtYURpZmZlcmVuY2VzOiBmYWxzZSxcbiAgICBkZWxpbWl0ZXI6IHtcbiAgICAgICAgZmllbGQ6ICcsJyxcbiAgICAgICAgd3JhcDogJ1wiJyxcbiAgICAgICAgZW9sOiAnXFxuJ1xuICAgIH0sXG4gICAgZW1wdHlGaWVsZFZhbHVlOiB1bmRlZmluZWQsXG4gICAgZXNjYXBlSGVhZGVyTmVzdGVkRG90czogdHJ1ZSxcbiAgICBleGNlbEJPTTogZmFsc2UsXG4gICAgZXhjbHVkZUtleXM6IFtdLFxuICAgIGV4cGFuZE5lc3RlZE9iamVjdHM6IHRydWUsXG4gICAgZXhwYW5kQXJyYXlPYmplY3RzOiBmYWxzZSxcbiAgICBwcmVwZW5kSGVhZGVyOiB0cnVlLFxuICAgIHByZXZlbnRDc3ZJbmplY3Rpb246IGZhbHNlLFxuICAgIHNvcnRIZWFkZXI6IGZhbHNlLFxuICAgIHRyaW1GaWVsZFZhbHVlczogZmFsc2UsXG4gICAgdHJpbUhlYWRlckZpZWxkczogZmFsc2UsXG4gICAgdW53aW5kQXJyYXlzOiBmYWxzZSxcbiAgICB1c2VEYXRlSXNvODYwMUZvcm1hdDogZmFsc2UsXG4gICAgdXNlTG9jYWxlRm9ybWF0OiBmYWxzZSxcbiAgICB3cmFwQm9vbGVhbnM6IGZhbHNlLFxufTtcbmV4cG9ydHMuZGVmYXVsdENzdjJKc29uT3B0aW9ucyA9IHtcbiAgICBkZWxpbWl0ZXI6IHtcbiAgICAgICAgZmllbGQ6ICcsJyxcbiAgICAgICAgd3JhcDogJ1wiJyxcbiAgICAgICAgZW9sOiAnXFxuJ1xuICAgIH0sXG4gICAgZXhjZWxCT006IGZhbHNlLFxuICAgIHByZXZlbnRDc3ZJbmplY3Rpb246IGZhbHNlLFxuICAgIHRyaW1GaWVsZFZhbHVlczogZmFsc2UsXG4gICAgdHJpbUhlYWRlckZpZWxkczogZmFsc2UsXG59O1xuZXhwb3J0cy5leGNlbEJPTSA9ICdcXHVmZWZmJztcbiIsIi8qKlxuICogQGxpY2Vuc2UgTUlUXG4gKiBkb2MtcGF0aCA8aHR0cHM6Ly9naXRodWIuY29tL21yb2RyaWcvZG9jLXBhdGg+XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgTWljaGFlbCBSb2RyaWd1ZXMuXG4gKi9cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0UGF0aCA9IGV4cG9ydHMuZXZhbHVhdGVQYXRoID0gdm9pZCAwO1xuLyoqXG4gKiBNYWluIGZ1bmN0aW9uIHRoYXQgZXZhbHVhdGVzIHRoZSBwYXRoIGluIGEgcGFydGljdWxhciBvYmplY3RcbiAqIEB0aHJvd3Mge0Vycm9yfSBwb3NzaWJsZSBlcnJvciBpZiBjYWxsIHN0YWNrIHNpemUgaXMgZXhjZWVkZWRcbiAqL1xuZnVuY3Rpb24gZXZhbHVhdGVQYXRoKG9iaiwga3ApIHtcbiAgICBpZiAoIW9iaikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyBkb3RJbmRleCwga2V5LCByZW1haW5pbmcgfSA9IHN0YXRlKGtwKTtcbiAgICBjb25zdCBrcFZhbCA9IHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGtwIGluIG9iaiA/IG9ialtrcF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qga2V5VmFsID0gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYga2V5IGluIG9iaiA/IG9ialtrZXldIDogdW5kZWZpbmVkO1xuICAgIGlmIChkb3RJbmRleCA+PSAwICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICEoa3AgaW4gb2JqKSkge1xuICAgICAgICBjb25zdCB7IGtleTogbmV4dEtleSB9ID0gc3RhdGUocmVtYWluaW5nKTtcbiAgICAgICAgY29uc3QgbmV4dEtleUFzSW50ID0gcGFyc2VJbnQobmV4dEtleSk7XG4gICAgICAgIC8vIElmIHRoZXJlJ3MgYW4gYXJyYXkgYXQgdGhlIGN1cnJlbnQga2V5IGluIHRoZSBvYmplY3QsIHRoZW4gaXRlcmF0ZSBvdmVyIHRob3NlIGl0ZW1zIGV2YWx1YXRpbmcgdGhlIHJlbWFpbmluZyBwYXRoXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGtleVZhbCkgJiYgaXNOYU4obmV4dEtleUFzSW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleVZhbC5tYXAoKGRvYykgPT4gZXZhbHVhdGVQYXRoKGRvYywgcmVtYWluaW5nKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBjYW4ganVzdCByZWN1clxuICAgICAgICByZXR1cm4gZXZhbHVhdGVQYXRoKGtleVZhbCwgcmVtYWluaW5nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIGNvbnN0IGtleUFzSW50ID0gcGFyc2VJbnQoa2V5KTtcbiAgICAgICAgaWYgKGtwID09PSBrZXkgJiYgZG90SW5kZXggPT09IC0xICYmICFpc05hTihrZXlBc0ludCkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlWYWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhpcyBvYmplY3QgaXMgYWN0dWFsbHkgYW4gYXJyYXksIHRoZW4gaXRlcmF0ZSBvdmVyIHRob3NlIGl0ZW1zIGV2YWx1YXRpbmcgdGhlIHBhdGhcbiAgICAgICAgcmV0dXJuIG9iai5tYXAoKGRvYykgPT4gZXZhbHVhdGVQYXRoKGRvYywga3ApKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZG90SW5kZXggPj0gMCAmJiBrcCAhPT0ga2V5ICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGtleSBpbiBvYmopIHtcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIGZpZWxkIHdpdGggYSBub24tbmVzdGVkIGRvdCwgdGhlbiByZWN1ciBpbnRvIHRoYXQgc3ViLXZhbHVlXG4gICAgICAgIHJldHVybiBldmFsdWF0ZVBhdGgoa2V5VmFsLCByZW1haW5pbmcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb3RJbmRleCA9PT0gLTEgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYga2V5IGluIG9iaiAmJiAhKGtwIGluIG9iaikpIHtcbiAgICAgICAgLy8gSWYgdGhlIGZpZWxkIGlzIGhlcmUsIGJ1dCB0aGUga2V5IHdhcyBlc2NhcGVkXG4gICAgICAgIHJldHVybiBrZXlWYWw7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgd2UgY2FuIGp1c3QgcmV0dXJuIHZhbHVlIGRpcmVjdGx5XG4gICAgcmV0dXJuIGtwVmFsO1xufVxuZXhwb3J0cy5ldmFsdWF0ZVBhdGggPSBldmFsdWF0ZVBhdGg7XG4vKipcbiAqIE1haW4gZnVuY3Rpb24gdGhhdCBwZXJmb3JtcyB2YWxpZGF0aW9uIGJlZm9yZSBwYXNzaW5nIG9mZiB0byBfc3BcbiAqIEB0aHJvd3Mge0Vycm9yfSBwb3NzaWJsZSBlcnJvciBpZiBjYWxsIHN0YWNrIHNpemUgaXMgZXhjZWVkZWRcbiAqL1xuZnVuY3Rpb24gc2V0UGF0aChvYmosIGtwLCB2KSB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBvYmplY3Qgd2FzIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICBlbHNlIGlmICgha3ApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBrZXlQYXRoIHdhcyBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIF9zcChvYmosIGtwLCB2KTtcbn1cbmV4cG9ydHMuc2V0UGF0aCA9IHNldFBhdGg7XG4vLyBIZWxwZXIgZnVuY3Rpb24gdGhhdCB3aWxsIHNldCB0aGUgdmFsdWUgaW4gdGhlIHByb3ZpZGVkIG9iamVjdC9hcnJheS5cbmZ1bmN0aW9uIF9zcChvYmosIGtwLCB2KSB7XG4gICAgY29uc3QgeyBkb3RJbmRleCwga2V5LCByZW1haW5pbmcgfSA9IHN0YXRlKGtwKTtcbiAgICAvLyBJZiB0aGlzIGlzIGNsZWFybHkgYSBwcm90b3R5cGUgcG9sbHV0aW9uIGF0dGVtcHQsIHRoZW4gcmVmdXNlIHRvIG1vZGlmeSB0aGUgcGF0aFxuICAgIGlmIChrcC5zdGFydHNXaXRoKCdfX3Byb3RvX18nKSB8fCBrcC5zdGFydHNXaXRoKCdjb25zdHJ1Y3RvcicpIHx8IGtwLnN0YXJ0c1dpdGgoJ3Byb3RvdHlwZScpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChkb3RJbmRleCA+PSAwKSB7XG4gICAgICAgIGNvbnN0IGtleUFzSW50ID0gcGFyc2VJbnQoa2V5KTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSAnLicgaW4gdGhlIGtleSBwYXRoLCByZWN1ciBvbiB0aGUgc3ViZG9jIGFuZCAuLi5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCAmJiAhKGtleSBpbiBvYmopICYmIEFycmF5LmlzQXJyYXkob2JqKSAmJiAhaXNOYU4oa2V5QXNJbnQpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIHZhbHVlIGF0IG9ialtrZXldIHRoZW4gcG9wdWxhdGUgYW4gZW1wdHkgb2JqZWN0XG4gICAgICAgICAgICBvYmpba2V5XSA9IG9ialtrZXldID8/IHt9O1xuICAgICAgICAgICAgLy8gQ29udGludWUgaXRlcmF0aW5nIG9uIHRoZSByZXN0IG9mIHRoZSBrZXkgcGF0aCB0byBzZXQgdGhlIGFwcHJvcHJpYXRlIHZhbHVlIHdoZXJlIGludGVuZGVkIGFuZCB0aGVuIHJldHVyblxuICAgICAgICAgICAgX3NwKG9ialtrZXldLCByZW1haW5pbmcsIHYpO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwgJiYgIShrZXkgaW4gb2JqKSAmJiBBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYW4gYXJyYXkgYW5kIHRoZXJlIGFyZSBtdWx0aXBsZSBsZXZlbHMgb2Yga2V5cyB0byBpdGVyYXRlIG92ZXIsIHJlY3VyLlxuICAgICAgICAgICAgb2JqLmZvckVhY2goKGRvYykgPT4gX3NwKGRvYywga3AsIHYpKTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsICYmICEoa2V5IGluIG9iaikgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgY29uc3QgeyBrZXk6IG5leHRLZXkgfSA9IHN0YXRlKHJlbWFpbmluZyk7XG4gICAgICAgICAgICBjb25zdCBuZXh0S2V5QXNJbnQgPSBwYXJzZUludChuZXh0S2V5KTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obmV4dEtleUFzSW50KSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGtleSBkb2Vzbid0IGV4aXN0IHlldCBhbmQgdGhlIG5leHQga2V5IGlzIGEgbnVtYmVyIChsaWtlbHkgYXJyYXkgaW5kZXgpLCBwb3B1bGF0ZSBhbiBlbXB0eSBhcnJheVxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZW1haW5pbmcgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlbWFpbmluZyBrZXkgaXMgZW1wdHksIHRoZW4gYSBgLmAgY2hhcmFjdGVyIGFwcGVhcmVkIHJpZ2h0IGF0IHRoZSBlbmQgb2YgdGhlIHBhdGggYW5kIHdhc24ndCBhY3R1YWxseSBpbmRpY2F0aW5nIGEgc2VwYXJhdGUgbGV2ZWxcbiAgICAgICAgICAgICAgICBvYmpba3BdID0gdjtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQga2V5IGRvZXNuJ3QgZXhpc3QgeWV0LCBwb3B1bGF0ZSBpdFxuICAgICAgICAgICAgICAgIG9ialtrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3NwKG9ialtrZXldLCByZW1haW5pbmcsIHYpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgY29uc3Qga2V5QXNJbnQgPSBwYXJzZUludChrZXkpO1xuICAgICAgICAvLyBJZiB0aGUgb2JqZWN0IGlzIGFuIGFycmF5IGFuZCB0aGlzIGtleSBpcyBhbiBpbnQgKGxpa2VseSBhcnJheSBpbmRleCksIHRoZW4gc2V0IHRoZSB2YWx1ZSBkaXJlY3RseSBhbmQgcmV0dXJuXG4gICAgICAgIGlmIChrcCA9PT0ga2V5ICYmIGRvdEluZGV4ID09PSAtMSAmJiAhaXNOYU4oa2V5QXNJbnQpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHY7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoaXMgXCJvYmpcIiBpcyBhY3R1YWxseSBhbiBhcnJheSwgdGhlbiB3ZSBjYW4gbG9vcCBvdmVyIGVhY2ggb2YgdGhlIHZhbHVlcyBhbmQgc2V0IHRoZSBwYXRoXG4gICAgICAgIG9iai5mb3JFYWNoKChkb2MpID0+IF9zcChkb2MsIHJlbWFpbmluZywgdikpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBjYW4gc2V0IHRoZSBwYXRoIGRpcmVjdGx5XG4gICAgICAgIG9ialtrZXldID0gdjtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgc29tZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gZXZhbHVhdGUgb3Igc2V0IGEgcGF0aCAgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGtleVBhdGggdmFsdWVcbmZ1bmN0aW9uIHN0YXRlKGtwKSB7XG4gICAgY29uc3QgZG90SW5kZXggPSBmaW5kRmlyc3ROb25Fc2NhcGVkRG90SW5kZXgoa3ApO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRvdEluZGV4LFxuICAgICAgICBrZXk6IGtwLnNsaWNlKDAsIGRvdEluZGV4ID49IDAgPyBkb3RJbmRleCA6IHVuZGVmaW5lZCkucmVwbGFjZSgvXFxcXC4vZywgJy4nKSxcbiAgICAgICAgcmVtYWluaW5nOiBrcC5zbGljZShkb3RJbmRleCArIDEpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGZpbmRGaXJzdE5vbkVzY2FwZWREb3RJbmRleChrcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga3AubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNDaGFyID0gaSA+IDAgPyBrcFtpIC0gMV0gOiAnJywgY3VycmVudENoYXIgPSBrcFtpXTtcbiAgICAgICAgaWYgKGN1cnJlbnRDaGFyID09PSAnLicgJiYgcHJldmlvdXNDaGFyICE9PSAnXFxcXCcpXG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0RvY3VtZW50VG9SZWN1ck9uID0gZXhwb3J0cy5mbGF0dGVuID0gZXhwb3J0cy51bmlxdWUgPSB2b2lkIDA7XG5mdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoYXJyYXkpXTtcbn1cbmV4cG9ydHMudW5pcXVlID0gdW5pcXVlO1xuZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uYXJyYXkpO1xufVxuZXhwb3J0cy5mbGF0dGVuID0gZmxhdHRlbjtcbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoaXMgdmFsdWUgaXMgYSBkb2N1bWVudCB0byByZWN1ciBvbiBvciBub3RcbiAqIEBwYXJhbSB2YWwgQW55IGl0ZW0gd2hvc2UgdHlwZSB3aWxsIGJlIGV2YWx1YXRlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRG9jdW1lbnRUb1JlY3VyT24odmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2YWwpICYmIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoO1xufVxuZXhwb3J0cy5pc0RvY3VtZW50VG9SZWN1ck9uID0gaXNEb2N1bWVudFRvUmVjdXJPbjtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVlcEtleXNGcm9tTGlzdCA9IGV4cG9ydHMuZGVlcEtleXMgPSB2b2lkIDA7XG5jb25zdCB1dGlscyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsc1wiKSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xuLyoqXG4gKiBSZXR1cm4gdGhlIGRlZXAga2V5cyBsaXN0IGZvciBhIHNpbmdsZSBkb2N1bWVudFxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZGVlcEtleXMob2JqZWN0LCBvcHRpb25zKSB7XG4gICAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZURlZXBLZXlzTGlzdCgnJywgb2JqZWN0LCBwYXJzZWRPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuZXhwb3J0cy5kZWVwS2V5cyA9IGRlZXBLZXlzO1xuLyoqXG4gKiBSZXR1cm4gdGhlIGRlZXAga2V5cyBsaXN0IGZvciBhbGwgZG9jdW1lbnRzIGluIHRoZSBwcm92aWRlZCBsaXN0XG4gKiBAcGFyYW0gbGlzdFxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIEFycmF5W0FycmF5W1N0cmluZ11dXG4gKi9cbmZ1bmN0aW9uIGRlZXBLZXlzRnJvbUxpc3QobGlzdCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3QubWFwKChkb2N1bWVudCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0JyAmJiBkb2N1bWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGRhdGEgYXQgdGhlIGtleSBpcyBhIGRvY3VtZW50LCB0aGVuIHdlIHJldHJpZXZlIHRoZSBzdWJIZWFkaW5nIHN0YXJ0aW5nIHdpdGggYW4gZW1wdHkgc3RyaW5nIGhlYWRpbmcgYW5kIHRoZSBkb2NcbiAgICAgICAgICAgIHJldHVybiBkZWVwS2V5cyhkb2N1bWVudCwgcGFyc2VkT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0pO1xufVxuZXhwb3J0cy5kZWVwS2V5c0Zyb21MaXN0ID0gZGVlcEtleXNGcm9tTGlzdDtcbmZ1bmN0aW9uIGdlbmVyYXRlRGVlcEtleXNMaXN0KGhlYWRpbmcsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKChjdXJyZW50S2V5KSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSBnaXZlbiBoZWFkaW5nIGlzIGVtcHR5LCB0aGVuIHdlIHNldCB0aGUgaGVhZGluZyB0byBiZSB0aGUgc3ViS2V5LCBvdGhlcndpc2Ugc2V0IGl0IGFzIGEgbmVzdGVkIGhlYWRpbmcgdy8gYSBkb3RcbiAgICAgICAgY29uc3Qga2V5TmFtZSA9IGJ1aWxkS2V5TmFtZShoZWFkaW5nLCBlc2NhcGVOZXN0ZWREb3RzSWZTcGVjaWZpZWQoY3VycmVudEtleSwgb3B0aW9ucykpO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGFub3RoZXIgbmVzdGVkIGRvY3VtZW50LCByZWN1ciBvbiB0aGUgc3ViLWRvY3VtZW50IHRvIHJldHJpZXZlIHRoZSBmdWxsIGtleSBuYW1lXG4gICAgICAgIGlmIChvcHRpb25zLmV4cGFuZE5lc3RlZE9iamVjdHMgJiYgdXRpbHMuaXNEb2N1bWVudFRvUmVjdXJPbihkYXRhW2N1cnJlbnRLZXldKSB8fCAob3B0aW9ucy5hcnJheUluZGV4ZXNBc0tleXMgJiYgQXJyYXkuaXNBcnJheShkYXRhW2N1cnJlbnRLZXldKSAmJiBkYXRhW2N1cnJlbnRLZXldLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZURlZXBLZXlzTGlzdChrZXlOYW1lLCBkYXRhW2N1cnJlbnRLZXldLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmV4cGFuZEFycmF5T2JqZWN0cyAmJiBBcnJheS5pc0FycmF5KGRhdGFbY3VycmVudEtleV0pKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgbmVzdGVkIGFycmF5IHRoYXQgd2UgbmVlZCB0byByZWN1ciBvblxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NBcnJheUtleXMoZGF0YVtjdXJyZW50S2V5XSwga2V5TmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5pZ25vcmVFbXB0eUFycmF5cyAmJiBBcnJheS5pc0FycmF5KGRhdGFbY3VycmVudEtleV0pICYmICFkYXRhW2N1cnJlbnRLZXldLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4gdGhpcyBrZXkgbmFtZSBzaW5jZSB3ZSBkb24ndCBoYXZlIGEgc3ViIGRvY3VtZW50XG4gICAgICAgIHJldHVybiBrZXlOYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiB1dGlscy5mbGF0dGVuKGtleXMpO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBwcm9jZXNzaW5nIG9mIGFycmF5cyB3aGVuIHRoZSBleHBhbmRBcnJheU9iamVjdHNcbiAqIG9wdGlvbiBpcyBzcGVjaWZpZWQuXG4gKiBAcGFyYW0gc3ViQXJyYXlcbiAqIEBwYXJhbSBjdXJyZW50S2V5UGF0aFxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBwcm9jZXNzQXJyYXlLZXlzKHN1YkFycmF5LCBjdXJyZW50S2V5UGF0aCwgb3B0aW9ucykge1xuICAgIGxldCBzdWJBcnJheUtleXMgPSBkZWVwS2V5c0Zyb21MaXN0KHN1YkFycmF5LCBvcHRpb25zKTtcbiAgICBpZiAoIXN1YkFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5pZ25vcmVFbXB0eUFycmF5c1doZW5FeHBhbmRpbmcgPyBbXSA6IFtjdXJyZW50S2V5UGF0aF07XG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YkFycmF5Lmxlbmd0aCAmJiB1dGlscy5mbGF0dGVuKHN1YkFycmF5S2V5cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIEhhcyBpdGVtcyBpbiB0aGUgYXJyYXksIGJ1dCBubyBvYmplY3RzXG4gICAgICAgIHJldHVybiBbY3VycmVudEtleVBhdGhdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3ViQXJyYXlLZXlzID0gc3ViQXJyYXlLZXlzLm1hcCgoc2NoZW1hS2V5cykgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hS2V5cykgJiYgc2NoZW1hS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2N1cnJlbnRLZXlQYXRoXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFLZXlzLm1hcCgoc3ViS2V5KSA9PiBidWlsZEtleU5hbWUoY3VycmVudEtleVBhdGgsIGVzY2FwZU5lc3RlZERvdHNJZlNwZWNpZmllZChzdWJLZXksIG9wdGlvbnMpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdXRpbHMudW5pcXVlKHV0aWxzLmZsYXR0ZW4oc3ViQXJyYXlLZXlzKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXNjYXBlTmVzdGVkRG90c0lmU3BlY2lmaWVkKGtleSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmVzY2FwZU5lc3RlZERvdHMpIHtcbiAgICAgICAgcmV0dXJuIGtleS5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJyk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG59XG4vKipcbiAqIEZ1bmN0aW9uIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIGtleSBwYXRoXG4gKiBAcGFyYW0gdXBwZXJLZXlOYW1lIFN0cmluZyBhY2N1bXVsYXRlZCBrZXkgcGF0aFxuICogQHBhcmFtIGN1cnJlbnRLZXlOYW1lIFN0cmluZyBjdXJyZW50IGtleSBuYW1lXG4gKiBAcmV0dXJucyBTdHJpbmdcbiAqL1xuZnVuY3Rpb24gYnVpbGRLZXlOYW1lKHVwcGVyS2V5TmFtZSwgY3VycmVudEtleU5hbWUpIHtcbiAgICBpZiAodXBwZXJLZXlOYW1lKSB7XG4gICAgICAgIHJldHVybiB1cHBlcktleU5hbWUgKyAnLicgKyBjdXJyZW50S2V5TmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRLZXlOYW1lO1xufVxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhcnJheUluZGV4ZXNBc0tleXM6IGZhbHNlLFxuICAgICAgICBleHBhbmROZXN0ZWRPYmplY3RzOiB0cnVlLFxuICAgICAgICBleHBhbmRBcnJheU9iamVjdHM6IGZhbHNlLFxuICAgICAgICBpZ25vcmVFbXB0eUFycmF5c1doZW5FeHBhbmRpbmc6IGZhbHNlLFxuICAgICAgICBlc2NhcGVOZXN0ZWREb3RzOiBmYWxzZSxcbiAgICAgICAgaWdub3JlRW1wdHlBcnJheXM6IGZhbHNlLFxuICAgICAgICAuLi4ob3B0aW9ucyA/PyB7fSlcbiAgICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0ludmFsaWQgPSBleHBvcnRzLmZsYXR0ZW4gPSBleHBvcnRzLnVuaXF1ZSA9IGV4cG9ydHMuYXJyYXlEaWZmZXJlbmNlID0gZXhwb3J0cy5pc0Vycm9yID0gZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGV4cG9ydHMuaXNOdWxsID0gZXhwb3J0cy5pc09iamVjdCA9IGV4cG9ydHMuaXNTdHJpbmcgPSBleHBvcnRzLmlzTnVtYmVyID0gZXhwb3J0cy51bndpbmQgPSBleHBvcnRzLmdldE5DaGFyYWN0ZXJzID0gZXhwb3J0cy5yZW1vdmVFbXB0eUZpZWxkcyA9IGV4cG9ydHMuaXNFbXB0eUZpZWxkID0gZXhwb3J0cy5jb21wdXRlU2NoZW1hRGlmZmVyZW5jZXMgPSBleHBvcnRzLmlzRGF0ZVJlcHJlc2VudGF0aW9uID0gZXhwb3J0cy5pc1N0cmluZ1JlcHJlc2VudGF0aW9uID0gZXhwb3J0cy5kZWVwQ29weSA9IGV4cG9ydHMudmFsaWRhdGUgPSBleHBvcnRzLmJ1aWxkQzJKT3B0aW9ucyA9IGV4cG9ydHMuYnVpbGRKMkNPcHRpb25zID0gdm9pZCAwO1xuY29uc3QgZG9jX3BhdGhfMSA9IHJlcXVpcmUoXCJkb2MtcGF0aFwiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuY29uc3QgZGF0ZVN0cmluZ1JlZ2V4ID0gL1xcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn06XFxkezJ9LlxcZHszfVovLCBNQVhfQVJSQVlfTEVOR1RIID0gMTAwMDAwO1xuLyoqXG4gKiBCdWlsZCB0aGUgb3B0aW9ucyB0byBiZSBwYXNzZWQgdG8gdGhlIGFwcHJvcHJpYXRlIGZ1bmN0aW9uXG4gKiBJZiBhIHVzZXIgZG9lcyBub3QgcHJvdmlkZSBjdXN0b20gb3B0aW9ucywgdGhlbiB3ZSB1c2Ugb3VyIGRlZmF1bHRcbiAqIElmIG9wdGlvbnMgYXJlIHByb3ZpZGVkLCB0aGVuIHdlIHNldCBlYWNoIHZhbGlkIGtleSB0aGF0IHdhcyBwYXNzZWRcbiAqL1xuZnVuY3Rpb24gYnVpbGRKMkNPcHRpb25zKG9wdHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5jb25zdGFudHNfMS5kZWZhdWx0SnNvbjJDc3ZPcHRpb25zLFxuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBkZWxpbWl0ZXI6IHtcbiAgICAgICAgICAgIGZpZWxkOiBvcHRzPy5kZWxpbWl0ZXI/LmZpZWxkID8/IGNvbnN0YW50c18xLmRlZmF1bHRKc29uMkNzdk9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkLFxuICAgICAgICAgICAgd3JhcDogb3B0cz8uZGVsaW1pdGVyPy53cmFwIHx8IGNvbnN0YW50c18xLmRlZmF1bHRKc29uMkNzdk9wdGlvbnMuZGVsaW1pdGVyLndyYXAsXG4gICAgICAgICAgICBlb2w6IG9wdHM/LmRlbGltaXRlcj8uZW9sIHx8IGNvbnN0YW50c18xLmRlZmF1bHRKc29uMkNzdk9wdGlvbnMuZGVsaW1pdGVyLmVvbCxcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGRUaXRsZU1hcDogT2JqZWN0LmNyZWF0ZSh7fSksXG4gICAgfTtcbn1cbmV4cG9ydHMuYnVpbGRKMkNPcHRpb25zID0gYnVpbGRKMkNPcHRpb25zO1xuLyoqXG4gKiBCdWlsZCB0aGUgb3B0aW9ucyB0byBiZSBwYXNzZWQgdG8gdGhlIGFwcHJvcHJpYXRlIGZ1bmN0aW9uXG4gKiBJZiBhIHVzZXIgZG9lcyBub3QgcHJvdmlkZSBjdXN0b20gb3B0aW9ucywgdGhlbiB3ZSB1c2Ugb3VyIGRlZmF1bHRcbiAqIElmIG9wdGlvbnMgYXJlIHByb3ZpZGVkLCB0aGVuIHdlIHNldCBlYWNoIHZhbGlkIGtleSB0aGF0IHdhcyBwYXNzZWRcbiAqL1xuZnVuY3Rpb24gYnVpbGRDMkpPcHRpb25zKG9wdHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5jb25zdGFudHNfMS5kZWZhdWx0Q3N2Mkpzb25PcHRpb25zLFxuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBkZWxpbWl0ZXI6IHtcbiAgICAgICAgICAgIGZpZWxkOiBvcHRzPy5kZWxpbWl0ZXI/LmZpZWxkID8/IGNvbnN0YW50c18xLmRlZmF1bHRDc3YySnNvbk9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkLFxuICAgICAgICAgICAgd3JhcDogb3B0cz8uZGVsaW1pdGVyPy53cmFwIHx8IGNvbnN0YW50c18xLmRlZmF1bHRDc3YySnNvbk9wdGlvbnMuZGVsaW1pdGVyLndyYXAsXG4gICAgICAgICAgICBlb2w6IG9wdHM/LmRlbGltaXRlcj8uZW9sIHx8IGNvbnN0YW50c18xLmRlZmF1bHRDc3YySnNvbk9wdGlvbnMuZGVsaW1pdGVyLmVvbCxcbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5idWlsZEMySk9wdGlvbnMgPSBidWlsZEMySk9wdGlvbnM7XG5mdW5jdGlvbiB2YWxpZGF0ZShkYXRhLCB2YWxpZGF0aW9uRm4sIGVycm9yTWVzc2FnZXMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJvck1lc3NhZ2VzLmNhbm5vdENhbGxPbn0gJHtkYXRhfS5gKTtcbiAgICBpZiAoIXZhbGlkYXRpb25GbihkYXRhKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZXMuZGF0YUNoZWNrRmFpbHVyZSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnZhbGlkYXRlID0gdmFsaWRhdGU7XG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZGVlcCBjb3B5IGFuIG9iamVjdCwgdXNlZCBieSB0aGUgbW9kdWxlIHRlc3RzXG4gKi9cbmZ1bmN0aW9uIGRlZXBDb3B5KG9iaikge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuZXhwb3J0cy5kZWVwQ29weSA9IGRlZXBDb3B5O1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgcmVwcmVzZW50YXRpb25cbiAqICAgb2YgYSBzdHJpbmcuIEdpdmVuIHRoZSBSRkM0MTgwIHJlcXVpcmVtZW50cywgdGhhdCBtZWFucyB0aGF0IHRoZSB2YWx1ZSBpc1xuICogICB3cmFwcGVkIGluIHZhbHVlIHdyYXAgZGVsaW1pdGVycyAodXN1YWxseSBhIHF1b3RhdGlvbiBtYXJrIG9uIGVhY2ggc2lkZSkuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nUmVwcmVzZW50YXRpb24oZmllbGRWYWx1ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGZpcnN0Q2hhciA9IGZpZWxkVmFsdWVbMF0sIGxhc3RJbmRleCA9IGZpZWxkVmFsdWUubGVuZ3RoIC0gMSwgbGFzdENoYXIgPSBmaWVsZFZhbHVlW2xhc3RJbmRleF07XG4gICAgLy8gSWYgdGhlIGZpZWxkIHN0YXJ0cyBhbmQgZW5kcyB3aXRoIGEgd3JhcCBkZWxpbWl0ZXJcbiAgICByZXR1cm4gZmlyc3RDaGFyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmIGxhc3RDaGFyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwO1xufVxuZXhwb3J0cy5pc1N0cmluZ1JlcHJlc2VudGF0aW9uID0gaXNTdHJpbmdSZXByZXNlbnRhdGlvbjtcbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHJlcHJlc2VudGF0aW9uXG4gKiAgIG9mIGEgZGF0ZS5cbiAqL1xuZnVuY3Rpb24gaXNEYXRlUmVwcmVzZW50YXRpb24oZmllbGRWYWx1ZSkge1xuICAgIHJldHVybiBkYXRlU3RyaW5nUmVnZXgudGVzdChmaWVsZFZhbHVlKTtcbn1cbmV4cG9ydHMuaXNEYXRlUmVwcmVzZW50YXRpb24gPSBpc0RhdGVSZXByZXNlbnRhdGlvbjtcbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2NoZW1hIGRpZmZlcmVuY2VzIGJldHdlZW4gdHdvIG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVTY2hlbWFEaWZmZXJlbmNlcyhzY2hlbWFBLCBzY2hlbWFCKSB7XG4gICAgcmV0dXJuIGFycmF5RGlmZmVyZW5jZShzY2hlbWFBLCBzY2hlbWFCKVxuICAgICAgICAuY29uY2F0KGFycmF5RGlmZmVyZW5jZShzY2hlbWFCLCBzY2hlbWFBKSk7XG59XG5leHBvcnRzLmNvbXB1dGVTY2hlbWFEaWZmZXJlbmNlcyA9IGNvbXB1dGVTY2hlbWFEaWZmZXJlbmNlcztcbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGZpZWxkIGlzIGNvbnNpZGVyZWQgZW1wdHkgc28gdGhhdCB0aGUgZW1wdHlGaWVsZFZhbHVlIGNhbiBiZSB1c2VkIGluc3RlYWRcbiAqL1xuZnVuY3Rpb24gaXNFbXB0eUZpZWxkKGZpZWxkVmFsdWUpIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoZmllbGRWYWx1ZSkgfHwgaXNOdWxsKGZpZWxkVmFsdWUpIHx8IGZpZWxkVmFsdWUgPT09ICcnO1xufVxuZXhwb3J0cy5pc0VtcHR5RmllbGQgPSBpc0VtcHR5RmllbGQ7XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgZW1wdHkgZmllbGQgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUVtcHR5RmllbGRzKGZpZWxkcykge1xuICAgIHJldHVybiBmaWVsZHMuZmlsdGVyKChmaWVsZCkgPT4gIWlzRW1wdHlGaWVsZChmaWVsZCkpO1xufVxuZXhwb3J0cy5yZW1vdmVFbXB0eUZpZWxkcyA9IHJlbW92ZUVtcHR5RmllbGRzO1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCByZXRyaWV2ZXMgdGhlIG5leHQgbiBjaGFyYWN0ZXJzIGZyb20gdGhlIHN0YXJ0IGluZGV4IGluXG4gKiAgIHRoZSBzdHJpbmcgaW5jbHVkaW5nIHRoZSBjaGFyYWN0ZXIgYXQgdGhlIHN0YXJ0IGluZGV4LiBUaGlzIGlzIHVzZWQgdG9cbiAqICAgY2hlY2sgaWYgYXJlIGN1cnJlbnRseSBhdCBhbiBFT0wgdmFsdWUsIHNpbmNlIGl0IGNvdWxkIGJlIG11bHRpcGxlXG4gKiAgIGNoYXJhY3RlcnMgaW4gbGVuZ3RoIChlZy4gJ1xcclxcbicpXG4gKi9cbmZ1bmN0aW9uIGdldE5DaGFyYWN0ZXJzKHN0ciwgc3RhcnQsIG4pIHtcbiAgICByZXR1cm4gc3RyLnN1YnN0cmluZyhzdGFydCwgc3RhcnQgKyBuKTtcbn1cbmV4cG9ydHMuZ2V0TkNoYXJhY3RlcnMgPSBnZXROQ2hhcmFjdGVycztcbi8qKlxuICogVGhlIGZvbGxvd2luZyB1bndpbmQgZnVuY3Rpb25hbGl0eSBpcyBhIGhlYXZpbHkgbW9kaWZpZWQgdmVyc2lvbiBvZiBAZWR3aW5jZW4nc1xuICogdW53aW5kIGV4dGVuc2lvbiBmb3IgbG9kYXNoLiBTaW5jZSBsb2Rhc2ggaXMgYSBsYXJnZSBwYWNrYWdlIHRvIHJlcXVpcmUgaW4sXG4gKiBhbmQgYWxsIG9mIHRoZSByZXF1aXJlZCBmdW5jdGlvbmFsaXR5IHdhcyBhbHJlYWR5IGJlaW5nIGltcG9ydGVkLCBlaXRoZXJcbiAqIG5hdGl2ZWx5IG9yIHdpdGggZG9jLXBhdGgsIEkgZGVjaWRlZCB0byByZXdyaXRlIHRoZSBtYWpvcml0eSBvZiB0aGUgbG9naWNcbiAqIHNvIHRoYXQgYW4gYWRkaXRpb25hbCBkZXBlbmRlbmN5IHdvdWxkIG5vdCBiZSByZXF1aXJlZC4gVGhlIG9yaWdpbmFsIGNvZGVcbiAqIHdpdGggdGhlIGxvZGFzaCBkZXBlbmRlbmN5IGNhbiBiZSBmb3VuZCBoZXJlOlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9lZHdpbmNlbi91bndpbmQvYmxvYi9tYXN0ZXIvaW5kZXguanNcbiAqL1xuLyoqXG4gKiBDb3JlIGZ1bmN0aW9uIHRoYXQgdW53aW5kcyBhbiBpdGVtIGF0IHRoZSBwcm92aWRlZCBwYXRoXG4gKi9cbmZ1bmN0aW9uIHVud2luZEl0ZW0oYWNjdW11bGF0b3IsIGl0ZW0sIGZpZWxkUGF0aCkge1xuICAgIGNvbnN0IHZhbHVlVG9VbndpbmQgPSAoMCwgZG9jX3BhdGhfMS5ldmFsdWF0ZVBhdGgpKGl0ZW0sIGZpZWxkUGF0aCk7XG4gICAgbGV0IGNsb25lZCA9IGRlZXBDb3B5KGl0ZW0pO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlVG9VbndpbmQpICYmIHZhbHVlVG9VbndpbmQubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlVG9VbndpbmQuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBjbG9uZWQgPSBkZWVwQ29weShpdGVtKTtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goKDAsIGRvY19wYXRoXzEuc2V0UGF0aCkoY2xvbmVkLCBmaWVsZFBhdGgsIHZhbCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZVRvVW53aW5kKSAmJiB2YWx1ZVRvVW53aW5kLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBQdXNoIGFuIGVtcHR5IHN0cmluZyBzbyB0aGUgdmFsdWUgaXMgZW1wdHkgc2luY2UgdGhlcmUgYXJlIG5vIHZhbHVlc1xuICAgICAgICAoMCwgZG9jX3BhdGhfMS5zZXRQYXRoKShjbG9uZWQsIGZpZWxkUGF0aCwgJycpO1xuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGNsb25lZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGNsb25lZCk7XG4gICAgfVxufVxuLyoqXG4gKiBNYWluIHVud2luZCBmdW5jdGlvbiB3aGljaCB0YWtlcyBhbiBhcnJheSBhbmQgYSBmaWVsZCB0byB1bndpbmQuXG4gKi9cbmZ1bmN0aW9uIHVud2luZChhcnJheSwgZmllbGQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHVud2luZEl0ZW0ocmVzdWx0LCBpdGVtLCBmaWVsZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMudW53aW5kID0gdW53aW5kO1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB2YWx1ZSBjYW4gYmUgY29udmVydGVkIHRvIGEgbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuICFpc05hTihOdW1iZXIodmFsdWUpKTtcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIHdoaWNoIHdlcmUgY3JlYXRlZCB0byByZW1vdmUgdW5kZXJzY29yZWpzIGZyb20gdGhpcyBwYWNrYWdlLlxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jztcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcbmZ1bmN0aW9uIGlzTnVsbCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbmZ1bmN0aW9uIGlzRXJyb3IodmFsdWUpIHtcbiAgICAvLyBUT0RPKG1yb2RyaWcpOiB0ZXN0IHRoaXMgcG9zc2libGUgY2hhbmdlXG4gICAgLy8gcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRXJyb3I7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEVycm9yXSc7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuZnVuY3Rpb24gYXJyYXlEaWZmZXJlbmNlKGEsIGIpIHtcbiAgICByZXR1cm4gYS5maWx0ZXIoKHgpID0+ICFiLmluY2x1ZGVzKHgpKTtcbn1cbmV4cG9ydHMuYXJyYXlEaWZmZXJlbmNlID0gYXJyYXlEaWZmZXJlbmNlO1xuZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KGFycmF5KV07XG59XG5leHBvcnRzLnVuaXF1ZSA9IHVuaXF1ZTtcbmZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgICAvLyBOb2RlIDExKyAtIHVzZSB0aGUgbmF0aXZlIGFycmF5IGZsYXR0ZW5pbmcgZnVuY3Rpb25cbiAgICBpZiAoYXJyYXkuZmxhdCkge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmxhdCgpO1xuICAgIH1cbiAgICAvLyAjMTY3IC0gYWxsb3cgYnJvd3NlcnMgdG8gZmxhdHRlbiB2ZXJ5IGxvbmcgMjAwaysgZWxlbWVudCBhcnJheXNcbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gTUFYX0FSUkFZX0xFTkdUSCkge1xuICAgICAgICBsZXQgc2FmZUFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYXJyYXkubGVuZ3RoOyBhICs9IE1BWF9BUlJBWV9MRU5HVEgpIHtcbiAgICAgICAgICAgIHNhZmVBcnJheSA9IHNhZmVBcnJheS5jb25jYXQoLi4uYXJyYXkuc2xpY2UoYSwgYSArIE1BWF9BUlJBWV9MRU5HVEgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2FmZUFycmF5O1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKChhY2N1bXVsYXRvciwgdmFsdWUpID0+IGFjY3VtdWxhdG9yLmNvbmNhdCh2YWx1ZSksIFtdKTtcbn1cbmV4cG9ydHMuZmxhdHRlbiA9IGZsYXR0ZW47XG4vKipcbiAqIFVzZWQgdG8gaGVscCBhdm9pZCBpbmNvcnJlY3QgdmFsdWVzIHJldHVybmVkIGJ5IEpTT04ucGFyc2Ugd2hlbiBjb252ZXJ0aW5nXG4gKiBDU1YgYmFjayB0byBKU09OLCBzdWNoIGFzICczOWUxODA0JyB3aGljaCBKU09OLnBhcnNlIGNvbnZlcnRzIHRvIEluZmluaXR5XG4gKi9cbmZ1bmN0aW9uIGlzSW52YWxpZChwYXJzZWRKc29uKSB7XG4gICAgcmV0dXJuIHBhcnNlZEpzb24gPT09IEluZmluaXR5IHx8XG4gICAgICAgIHBhcnNlZEpzb24gPT09IC1JbmZpbml0eTtcbn1cbmV4cG9ydHMuaXNJbnZhbGlkID0gaXNJbnZhbGlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkpzb24yQ3N2ID0gdm9pZCAwO1xuY29uc3QgZG9jX3BhdGhfMSA9IHJlcXVpcmUoXCJkb2MtcGF0aFwiKTtcbmNvbnN0IGRlZWtzXzEgPSByZXF1aXJlKFwiZGVla3NcIik7XG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcbmNvbnN0IHV0aWxzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3V0aWxzXCIpKTtcbmNvbnN0IEpzb24yQ3N2ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCB3cmFwRGVsaW1pdGVyQ2hlY2tSZWdleCA9IG5ldyBSZWdFeHAob3B0aW9ucy5kZWxpbWl0ZXIud3JhcCwgJ2cnKSwgY3JsZlNlYXJjaFJlZ2V4ID0gL1xccj9cXG58XFxyLywgY3VzdG9tVmFsdWVQYXJzZXIgPSBvcHRpb25zLnBhcnNlVmFsdWUgJiYgdHlwZW9mIG9wdGlvbnMucGFyc2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMucGFyc2VWYWx1ZSA6IG51bGwsIGV4cGFuZGluZ1dpdGhvdXRVbndpbmRpbmcgPSBvcHRpb25zLmV4cGFuZEFycmF5T2JqZWN0cyAmJiAhb3B0aW9ucy51bndpbmRBcnJheXMsIGRlZWtzT3B0aW9ucyA9IHtcbiAgICAgICAgYXJyYXlJbmRleGVzQXNLZXlzOiBvcHRpb25zLmFycmF5SW5kZXhlc0FzS2V5cyxcbiAgICAgICAgZXhwYW5kTmVzdGVkT2JqZWN0czogb3B0aW9ucy5leHBhbmROZXN0ZWRPYmplY3RzLFxuICAgICAgICBleHBhbmRBcnJheU9iamVjdHM6IGV4cGFuZGluZ1dpdGhvdXRVbndpbmRpbmcsXG4gICAgICAgIGlnbm9yZUVtcHR5QXJyYXlzV2hlbkV4cGFuZGluZzogZXhwYW5kaW5nV2l0aG91dFVud2luZGluZyxcbiAgICAgICAgZXNjYXBlTmVzdGVkRG90czogdHJ1ZSxcbiAgICB9O1xuICAgIC8qKiBIRUFERVIgRklFTEQgRlVOQ1RJT05TICoqL1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3Qgb2YgZGF0YSBmaWVsZCBuYW1lcyBvZiBhbGwgZG9jdW1lbnRzIGluIHRoZSBwcm92aWRlZCBsaXN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RmllbGROYW1lTGlzdChkYXRhKSB7XG4gICAgICAgIC8vIElmIGtleXMgd2VyZW4ndCBzcGVjaWZpZWQsIHRoZW4gd2UnbGwgdXNlIHRoZSBsaXN0IG9mIGtleXMgZ2VuZXJhdGVkIGJ5IHRoZSBkZWVrcyBtb2R1bGVcbiAgICAgICAgcmV0dXJuICgwLCBkZWVrc18xLmRlZXBLZXlzRnJvbUxpc3QpKGRhdGEsIGRlZWtzT3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyB0aGUgc2NoZW1hcyBieSBjaGVja2luZyBmb3Igc2NoZW1hIGRpZmZlcmVuY2VzLCBpZiBzbyBkZXNpcmVkLlxuICAgICAqIElmIHNjaGVtYSBkaWZmZXJlbmNlcyBhcmUgbm90IHRvIGJlIGNoZWNrZWQsIHRoZW4gaXQgcmVzb2x2ZXMgdGhlIHVuaXF1ZVxuICAgICAqIGxpc3Qgb2YgZmllbGQgbmFtZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1NjaGVtYXMoZG9jdW1lbnRTY2hlbWFzKSB7XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIHRvIGNoZWNrIGZvciB0aGUgc2FtZSBzY2hlbWEgKHJlZ2FyZGxlc3Mgb2Ygc2NoZW1hIG9yZGVyaW5nKVxuICAgICAgICBpZiAob3B0aW9ucy5jaGVja1NjaGVtYURpZmZlcmVuY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tTY2hlbWFEaWZmZXJlbmNlcyhkb2N1bWVudFNjaGVtYXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBkbyBub3QgY2FyZSBpZiB0aGUgc2NoZW1hcyBhcmUgZGlmZmVyZW50LCBzbyB3ZSBzaG91bGQgZ2V0IHRoZSB1bmlxdWUgbGlzdCBvZiBrZXlzXG4gICAgICAgICAgICBjb25zdCB1bmlxdWVGaWVsZE5hbWVzID0gdXRpbHMudW5pcXVlKHV0aWxzLmZsYXR0ZW4oZG9jdW1lbnRTY2hlbWFzKSk7XG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlRmllbGROYW1lcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHRoZSBzY2hlbWEgZGlmZmVyZW5jZSBjaGVjaywgaWYgdGhlIHVzZXIgc3BlY2lmaWVzIHRoYXQgaXQgc2hvdWxkIGJlIGNoZWNrZWQuXG4gICAgICogSWYgdGhlcmUgYXJlIG5vIGZpZWxkIG5hbWVzLCB0aGVuIHRoZXJlIGFyZSBubyBkaWZmZXJlbmNlcy5cbiAgICAgKiBPdGhlcndpc2UsIHdlIGdldCB0aGUgZmlyc3Qgc2NoZW1hIGFuZCB0aGUgcmVtYWluaW5nIGxpc3Qgb2Ygc2NoZW1hc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrU2NoZW1hRGlmZmVyZW5jZXMoZG9jdW1lbnRTY2hlbWFzKSB7XG4gICAgICAgIC8vIGhhdmUgbXVsdGlwbGUgZG9jdW1lbnRzIC0gZW5zdXJlIG9ubHkgb25lIHNjaGVtYSAocmVnYXJkbGVzcyBvZiBmaWVsZCBvcmRlcmluZylcbiAgICAgICAgY29uc3QgZmlyc3REb2NTY2hlbWEgPSBkb2N1bWVudFNjaGVtYXNbMF0sIHJlc3RPZkRvY3VtZW50U2NoZW1hcyA9IGRvY3VtZW50U2NoZW1hcy5zbGljZSgxKSwgc2NoZW1hRGlmZmVyZW5jZXMgPSBjb21wdXRlTnVtYmVyT2ZTY2hlbWFEaWZmZXJlbmNlcyhmaXJzdERvY1NjaGVtYSwgcmVzdE9mRG9jdW1lbnRTY2hlbWFzKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHNjaGVtYSBpbmNvbnNpc3RlbmNpZXMsIHRocm93IGEgc2NoZW1hIG5vdCB0aGUgc2FtZSBlcnJvclxuICAgICAgICBpZiAoc2NoZW1hRGlmZmVyZW5jZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihjb25zdGFudHNfMS5lcnJvcnMuanNvbjJjc3Yubm90U2FtZVNjaGVtYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpcnN0RG9jU2NoZW1hO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlcyB0aGUgbnVtYmVyIG9mIHNjaGVtYSBkaWZmZXJlbmNlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVOdW1iZXJPZlNjaGVtYURpZmZlcmVuY2VzKGZpcnN0RG9jU2NoZW1hLCByZXN0T2ZEb2N1bWVudFNjaGVtYXMpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RPZkRvY3VtZW50U2NoZW1hcy5yZWR1Y2UoKHNjaGVtYURpZmZlcmVuY2VzLCBkb2N1bWVudFNjaGVtYSkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHNjaGVtYXMsIGluY3JlbWVudCB0aGUgY291bnRlciBvZiBzY2hlbWEgaW5jb25zaXN0ZW5jaWVzXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZkRpZmZlcmVuY2VzID0gdXRpbHMuY29tcHV0ZVNjaGVtYURpZmZlcmVuY2VzKGZpcnN0RG9jU2NoZW1hLCBkb2N1bWVudFNjaGVtYSkubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlck9mRGlmZmVyZW5jZXMgPiAwXG4gICAgICAgICAgICAgICAgPyBzY2hlbWFEaWZmZXJlbmNlcyArIDFcbiAgICAgICAgICAgICAgICA6IHNjaGVtYURpZmZlcmVuY2VzO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgc28gc3BlY2lmaWVkLCB0aGlzIGZpbHRlcnMgdGhlIGRldGVjdGVkIGtleSBwYXRocyB0byBleGNsdWRlIGFueSBrZXlzIHRoYXQgaGF2ZSBiZWVuIHNwZWNpZmllZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbHRlckV4Y2x1ZGVkS2V5cyhrZXlQYXRocykge1xuICAgICAgICBpZiAob3B0aW9ucy5leGNsdWRlS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIGtleVBhdGhzLmZpbHRlcigoa2V5UGF0aCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZXhjbHVkZWRLZXkgb2Ygb3B0aW9ucy5leGNsdWRlS2V5cykge1xuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IG1hdGNoIGlmIHRoZSBleGNsdWRlZEtleSBhcHBlYXJzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZyBzbyB3ZSBkb24ndCBhY2NpZGVudGFsbHkgbWF0Y2ggYSBrZXkgZmFydGhlciBkb3duIGluIGEga2V5IHBhdGhcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSBleGNsdWRlZEtleSBpbnN0YW5jZW9mIFJlZ0V4cCA/IGV4Y2x1ZGVkS2V5IDogbmV3IFJlZ0V4cChgXiR7ZXhjbHVkZWRLZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGNsdWRlZEtleSA9PT0ga2V5UGF0aCB8fCBrZXlQYXRoLm1hdGNoKHJlZ2V4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBFeGNsdWRlIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gT3RoZXJ3aXNlLCBpbmNsdWRlIHRoZSBrZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlQYXRocztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgc28gc3BlY2lmaWVkLCB0aGlzIHNvcnRzIHRoZSBoZWFkZXIgZmllbGQgbmFtZXMgYWxwaGFiZXRpY2FsbHlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzb3J0SGVhZGVyRmllbGRzKGZpZWxkTmFtZXMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuc29ydEhlYWRlciAmJiB0eXBlb2Ygb3B0aW9ucy5zb3J0SGVhZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGROYW1lcy5zb3J0KG9wdGlvbnMuc29ydEhlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5zb3J0SGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGROYW1lcy5zb3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkTmFtZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaW1zIHRoZSBoZWFkZXIgZmllbGRzLCBpZiB0aGUgdXNlciBkZXNpcmVzIHRoZW0gdG8gYmUgdHJpbW1lZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmltSGVhZGVyRmllbGRzKHBhcmFtcykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmltSGVhZGVyRmllbGRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuaGVhZGVyRmllbGRzID0gcGFyYW1zLmhlYWRlckZpZWxkcy5tYXAoKGZpZWxkKSA9PiBmaWVsZC5zcGxpdCgnLicpXG4gICAgICAgICAgICAgICAgLm1hcCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQudHJpbSgpKVxuICAgICAgICAgICAgICAgIC5qb2luKCcuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyYXAgdGhlIGhlYWRpbmdzLCBpZiBkZXNpcmVkIGJ5IHRoZSB1c2VyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdyYXBIZWFkZXJGaWVsZHMocGFyYW1zKSB7XG4gICAgICAgIC8vIG9ubHkgcGVyZm9ybSB0aGlzIGlmIHdlIGFyZSBhY3R1YWxseSBwcmVwZW5kaW5nIHRoZSBoZWFkZXJcbiAgICAgICAgaWYgKG9wdGlvbnMucHJlcGVuZEhlYWRlcikge1xuICAgICAgICAgICAgcGFyYW1zLmhlYWRlckZpZWxkcyA9IHBhcmFtcy5oZWFkZXJGaWVsZHMubWFwKGZ1bmN0aW9uIChoZWFkaW5nS2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdyYXBGaWVsZFZhbHVlSWZOZWNlc3NhcnkoaGVhZGluZ0tleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIENTViBoZWFkZXIgc3RyaW5nIGJ5IGpvaW5pbmcgdGhlIGhlYWRlckZpZWxkcyBieSB0aGUgZmllbGQgZGVsaW1pdGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDc3ZIZWFkZXIocGFyYW1zKSB7XG4gICAgICAgIC8vICMxODUgLSBnZW5lcmF0ZSBhIGtleXMgbGlzdCB0byBhdm9pZCBmaW5kaW5nIG5hdGl2ZSBNYXAoKSBtZXRob2RzXG4gICAgICAgIGNvbnN0IGZpZWxkVGl0bGVNYXBLZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucy5maWVsZFRpdGxlTWFwKTtcbiAgICAgICAgcGFyYW1zLmhlYWRlciA9IHBhcmFtcy5oZWFkZXJGaWVsZHNcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyS2V5ID0gZmllbGQ7XG4gICAgICAgICAgICAvLyBJZiBhIGN1c3RvbSBmaWVsZCB0aXRsZSB3YXMgcHJvdmlkZWQgZm9yIHRoaXMgZmllbGQsIHVzZSB0aGF0XG4gICAgICAgICAgICBpZiAoZmllbGRUaXRsZU1hcEtleXMuaW5jbHVkZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyS2V5ID0gb3B0aW9ucy5maWVsZFRpdGxlTWFwW2ZpZWxkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFvcHRpb25zLmVzY2FwZUhlYWRlck5lc3RlZERvdHMpIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGlmIHRoZSB1c2VyIGRvZXNuJ3Qgd2FudCBuZXN0ZWQgZG90cyBpbiBrZXlzIHRvIGJlIGVzY2FwZWQsIHRoZW4gdW5lc2NhcGUgdGhlbVxuICAgICAgICAgICAgICAgIGhlYWRlcktleSA9IGhlYWRlcktleS5yZXBsYWNlKC9cXFxcXFwuL2csICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd3JhcEZpZWxkVmFsdWVJZk5lY2Vzc2FyeShoZWFkZXJLZXkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQpO1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb252ZXJ0S2V5c1RvSGVhZGVyRmllbGRzKCkge1xuICAgICAgICBpZiAoIW9wdGlvbnMua2V5cylcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMua2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmICdmaWVsZCcgaW4ga2V5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWVsZFRpdGxlTWFwW2tleS5maWVsZF0gPSBrZXkudGl0bGUgPz8ga2V5LmZpZWxkO1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXkuZmllbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZXh0cmFjdFdpbGRjYXJkTWF0Y2hLZXlzKCkge1xuICAgICAgICBpZiAoIW9wdGlvbnMua2V5cylcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMua2V5cy5mbGF0TWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgcGxhaW4gc3RyaW5ncyB0aGF0IHdlcmUgcGFzc2VkIGluIG9wdGlvbnMua2V5c1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0/LndpbGRjYXJkTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gXCJmaWVsZFwiIHZhbHVlIGZvciBvYmplY3RzIHdpdGggd2lsZGNhcmRNYXRjaDogdHJ1ZVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZpZWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRXhjbHVkZSBvdGhlciBvYmplY3RzXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgaGVhZGluZ3MgZm9yIGFsbCBkb2N1bWVudHMgYW5kIHJldHVybiBpdC5cbiAgICAgKiBUaGlzIGNoZWNrcyB0aGF0IGFsbCBkb2N1bWVudHMgaGF2ZSB0aGUgc2FtZSBzY2hlbWEuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmV0cmlldmVIZWFkZXJGaWVsZHMoZGF0YSkge1xuICAgICAgICBjb25zdCB3aWxkY2FyZE1hdGNoS2V5cyA9IGV4dHJhY3RXaWxkY2FyZE1hdGNoS2V5cygpO1xuICAgICAgICBjb25zdCBrZXlTdHJpbmdzID0gY29udmVydEtleXNUb0hlYWRlckZpZWxkcygpO1xuICAgICAgICBjb25zdCBmaWVsZE5hbWVzID0gZ2V0RmllbGROYW1lTGlzdChkYXRhKTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkID0gcHJvY2Vzc1NjaGVtYXMoZmllbGROYW1lcyk7XG4gICAgICAgIGlmIChvcHRpb25zLmtleXMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMua2V5cyA9IGtleVN0cmluZ3M7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVkS2V5cyA9IGtleVN0cmluZ3MuZmxhdE1hcCgodXNlclByb3ZpZGVkS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSB3aWxkY2FyZCBtYXRjaGVkIGtleSwgdGhlbiBqdXN0IHJldHVybiBhbmQgaW5jbHVkZSBpdCBpbiB0aGUgcmVzdWx0aW5nIGtleSBsaXN0XG4gICAgICAgICAgICAgICAgaWYgKCF3aWxkY2FyZE1hdGNoS2V5cy5pbmNsdWRlcyh1c2VyUHJvdmlkZWRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyUHJvdmlkZWRLZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaWRlbnRpZnkgYWxsIGRldGVjdGVkIGtleXMgdGhhdCBtYXRjaCB3aXRoIHRoZSBwcm92aWRlZCB3aWxkY2FyZCBrZXk6XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7dXNlclByb3ZpZGVkS2V5fWApO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGV0ZWN0ZWRLZXkgb2YgcHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyUHJvdmlkZWRLZXkgPT09IGRldGVjdGVkS2V5IHx8IGRldGVjdGVkS2V5Lm1hdGNoKHJlZ2V4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGRldGVjdGVkS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnVud2luZEFycmF5cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gZmlsdGVyRXhjbHVkZWRLZXlzKG1hdGNoZWRLZXlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydEhlYWRlckZpZWxkcyhmaWx0ZXJlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBmaWx0ZXJFeGNsdWRlZEtleXMocHJvY2Vzc2VkKTtcbiAgICAgICAgcmV0dXJuIHNvcnRIZWFkZXJGaWVsZHMoZmlsdGVyZWQpO1xuICAgIH1cbiAgICAvKiogUkVDT1JEIEZJRUxEIEZVTkNUSU9OUyAqKi9cbiAgICAvKipcbiAgICAgKiBVbndpbmRzIG9iamVjdHMgaW4gYXJyYXlzIHdpdGhpbiByZWNvcmQgb2JqZWN0cyBpZiB0aGUgdXNlciBzcGVjaWZpZXMgdGhlXG4gICAgICogZXhwYW5kQXJyYXlPYmplY3RzIG9wdGlvbi4gSWYgbm90IHNwZWNpZmllZCwgdGhpcyBwYXNzZXMgdGhlIHBhcmFtc1xuICAgICAqIGFyZ3VtZW50IHRocm91Z2ggdG8gdGhlIG5leHQgZnVuY3Rpb24gaW4gdGhlIHByb21pc2UgY2hhaW4uXG4gICAgICpcbiAgICAgKiBUaGUgYGZpbmFsUGFzc2AgcGFyYW1ldGVyIGlzIHVzZWQgdG8gdHJpZ2dlciBvbmUgbGFzdCBwYXNzIHRvIGVuc3VyZSBubyBtb3JlXG4gICAgICogYXJyYXlzIG5lZWQgdG8gYmUgZXhwYW5kZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bndpbmRSZWNvcmRzSWZOZWNlc3NhcnkocGFyYW1zLCBmaW5hbFBhc3MgPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9ucy51bndpbmRBcnJheXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUmVjb3Jkc0xlbmd0aCA9IHBhcmFtcy5yZWNvcmRzLmxlbmd0aDtcbiAgICAgICAgICAgIC8vIFVud2luZCBlYWNoIG9mIHRoZSBkb2N1bWVudHMgYXQgdGhlIGdpdmVuIGhlYWRlckZpZWxkXG4gICAgICAgICAgICBwYXJhbXMuaGVhZGVyRmllbGRzLmZvckVhY2goKGhlYWRlckZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnJlY29yZHMgPSB1dGlscy51bndpbmQocGFyYW1zLnJlY29yZHMsIGhlYWRlckZpZWxkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyRmllbGRzID0gcmV0cmlldmVIZWFkZXJGaWVsZHMocGFyYW1zLnJlY29yZHMpO1xuICAgICAgICAgICAgcGFyYW1zLmhlYWRlckZpZWxkcyA9IGhlYWRlckZpZWxkcztcbiAgICAgICAgICAgIC8vIElmIHdlIHdlcmUgYWJsZSB0byB1bndpbmQgbW9yZSBhcnJheXMsIHRoZW4gdHJ5IHVud2luZGluZyBhZ2Fpbi4uLlxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsUmVjb3Jkc0xlbmd0aCAhPT0gcGFyYW1zLnJlY29yZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVud2luZFJlY29yZHNJZk5lY2Vzc2FyeShwYXJhbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBkaWRuJ3QgdW53aW5kIGFueSBhZGRpdGlvbmFsIGFycmF5cywgc28gY29udGludWUuLi5cbiAgICAgICAgICAgIC8vIFJ1biBhIGZpbmFsIHRpbWUgaW4gY2FzZSB0aGUgZWFybGllciB1bndpbmRpbmcgZXhwb3NlZCBhZGRpdGlvbmFsXG4gICAgICAgICAgICAvLyBhcnJheXMgdG8gdW53aW5kLi4uXG4gICAgICAgICAgICBpZiAoIWZpbmFsUGFzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bndpbmRSZWNvcmRzSWZOZWNlc3NhcnkocGFyYW1zLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGtleXMgd2VyZSBwcm92aWRlZCwgc2V0IHRoZSBoZWFkZXJGaWVsZHMgYmFjayB0byB0aGUgcHJvdmlkZWQga2V5cyBhZnRlciB1bndpbmRpbmc6XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5rZXlzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlclNlbGVjdGVkRmllbGRzID0gY29udmVydEtleXNUb0hlYWRlckZpZWxkcygpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5oZWFkZXJGaWVsZHMgPSBmaWx0ZXJFeGNsdWRlZEtleXModXNlclNlbGVjdGVkRmllbGRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFpbiBmdW5jdGlvbiB3aGljaCBoYW5kbGVzIHRoZSBwcm9jZXNzaW5nIG9mIGEgcmVjb3JkLCBvciBkb2N1bWVudCB0byBiZSBjb252ZXJ0ZWQgdG8gQ1NWIGZvcm1hdFxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3BlY2lmaWVzIGFuZCBwZXJmb3JtcyB0aGUgbmVjZXNzYXJ5IG9wZXJhdGlvbnMgaW4gdGhlIG5lY2Vzc2FyeSBvcmRlclxuICAgICAqIGluIG9yZGVyIHRvIG9idGFpbiB0aGUgZGF0YSBhbmQgY29udmVydCBpdCB0byBDU1YgZm9ybSB3aGlsZSBtYWludGFpbmluZyBSRkMgNDE4MCBjb21wbGlhbmNlLlxuICAgICAqICogT3JkZXIgb2Ygb3BlcmF0aW9uczpcbiAgICAgKiAtIEdldCBmaWVsZHMgZnJvbSBwcm92aWRlZCBrZXkgbGlzdCAoYXMgYXJyYXkgb2YgYWN0dWFsIHZhbHVlcylcbiAgICAgKiAtIENvbnZlcnQgdGhlIHZhbHVlcyB0byBjc3Yvc3RyaW5nIHJlcHJlc2VudGF0aW9uIFtwb3NzaWJsZSBvcHRpb24gaGVyZSBmb3IgY3VzdG9tIGNvbnZlcnRlcnM/XVxuICAgICAqIC0gVHJpbSBmaWVsZHNcbiAgICAgKiAtIERldGVybWluZSBpZiB0aGV5IG5lZWQgdG8gYmUgd3JhcHBlZCAoJiB3cmFwIGlmIG5lY2Vzc2FyeSlcbiAgICAgKiAtIENvbWJpbmUgdmFsdWVzIGZvciBlYWNoIGxpbmUgKGJ5IGpvaW5pbmcgYnkgZmllbGQgZGVsaW1pdGVyKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByb2Nlc3NSZWNvcmRzKHBhcmFtcykge1xuICAgICAgICBwYXJhbXMucmVjb3JkU3RyaW5nID0gcGFyYW1zLnJlY29yZHMubWFwKChyZWNvcmQpID0+IHtcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGRhdGEgZm9yIGVhY2ggb2YgdGhlIGhlYWRlckZpZWxkcyBmcm9tIHRoaXMgcmVjb3JkXG4gICAgICAgICAgICBjb25zdCByZWNvcmRGaWVsZERhdGEgPSByZXRyaWV2ZVJlY29yZEZpZWxkRGF0YShyZWNvcmQsIHBhcmFtcy5oZWFkZXJGaWVsZHMpLCBcbiAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGRhdGEgaW4gdGhpcyByZWNvcmQgYW5kIHJldHVybiB0aGVcbiAgICAgICAgICAgIHByb2Nlc3NlZFJlY29yZERhdGEgPSByZWNvcmRGaWVsZERhdGEubWFwKChmaWVsZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHRyaW1SZWNvcmRGaWVsZFZhbHVlKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBwcmV2ZW50Q3N2SW5qZWN0aW9uKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdpZmllZCA9IGN1c3RvbVZhbHVlUGFyc2VyID8gY3VzdG9tVmFsdWVQYXJzZXIoZmllbGRWYWx1ZSwgcmVjb3JkRmllbGRWYWx1ZVRvU3RyaW5nKSA6IHJlY29yZEZpZWxkVmFsdWVUb1N0cmluZyhmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdHJpbmdpZmllZCA9IHdyYXBGaWVsZFZhbHVlSWZOZWNlc3Nhcnkoc3RyaW5naWZpZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZmllZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gSm9pbiB0aGUgcmVjb3JkIGRhdGEgYnkgdGhlIGZpZWxkIGRlbGltaXRlclxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlQ3N2Um93RnJvbVJlY29yZChwcm9jZXNzZWRSZWNvcmREYXRhKTtcbiAgICAgICAgfSkuam9pbihvcHRpb25zLmRlbGltaXRlci5lb2wpO1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gaW50ZW5kZWQgdG8gcHJvY2VzcyAqanVzdCogYXJyYXkgdmFsdWVzIHdoZW4gdGhlIGV4cGFuZEFycmF5T2JqZWN0cyBzZXR0aW5nIGlzIHNldCB0byB0cnVlXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1JlY29yZEZpZWxkRGF0YUZvckV4cGFuZGVkQXJyYXlPYmplY3QocmVjb3JkRmllbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFJlY29yZEZpZWxkVmFsdWUgPSB1dGlscy5yZW1vdmVFbXB0eUZpZWxkcyhyZWNvcmRGaWVsZFZhbHVlKTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhbiBhcnJheSBhbmQgaXQncyBlaXRoZXIgZW1wdHkgb2YgZnVsbCBvZiBlbXB0eSB2YWx1ZXMsIHRoZW4gdXNlIGFuIGVtcHR5IHZhbHVlIHJlcHJlc2VudGF0aW9uXG4gICAgICAgIGlmICghcmVjb3JkRmllbGRWYWx1ZS5sZW5ndGggfHwgIWZpbHRlcmVkUmVjb3JkRmllbGRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmVtcHR5RmllbGRWYWx1ZSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaWx0ZXJlZFJlY29yZEZpZWxkVmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGhhdmUgYW4gYXJyYXkgb2YgYWN0dWFsIHZhbHVlcy4uLlxuICAgICAgICAgICAgLy8gU2luY2Ugd2UgYXJlIGV4cGFuZGluZyBhcnJheSBvYmplY3RzLCB3ZSB3aWxsIHdhbnQgdG8ga2V5IGluIG9uIHZhbHVlcyBvZiBvYmplY3RzLlxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkUmVjb3JkRmllbGRWYWx1ZVswXTsgLy8gRXh0cmFjdCB0aGUgc2luZ2xlIHZhbHVlIGluIHRoZSBhcnJheVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWNvcmRGaWVsZFZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCBmaWVsZCB2YWx1ZXMgZnJvbSBhIHBhcnRpY3VsYXIgcmVjb3JkIGZvciB0aGUgZ2l2ZW4gbGlzdCBvZiBmaWVsZHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXRyaWV2ZVJlY29yZEZpZWxkRGF0YShyZWNvcmQsIGZpZWxkcykge1xuICAgICAgICBjb25zdCByZWNvcmRWYWx1ZXMgPSBbXTtcbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkRmllbGRWYWx1ZSA9ICgwLCBkb2NfcGF0aF8xLmV2YWx1YXRlUGF0aCkocmVjb3JkLCBmaWVsZCk7XG4gICAgICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKG9wdGlvbnMuZW1wdHlGaWVsZFZhbHVlKSAmJiB1dGlscy5pc0VtcHR5RmllbGQocmVjb3JkRmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZWNvcmRGaWVsZFZhbHVlID0gb3B0aW9ucy5lbXB0eUZpZWxkVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLmV4cGFuZEFycmF5T2JqZWN0cyAmJiBBcnJheS5pc0FycmF5KHJlY29yZEZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkRmllbGRWYWx1ZSA9IHByb2Nlc3NSZWNvcmRGaWVsZERhdGFGb3JFeHBhbmRlZEFycmF5T2JqZWN0KHJlY29yZEZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjb3JkVmFsdWVzLnB1c2gocmVjb3JkRmllbGRWYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVjb3JkVmFsdWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHJlY29yZCBmaWVsZCB2YWx1ZSB0byBpdHMgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVjb3JkRmllbGRWYWx1ZVRvU3RyaW5nKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgaXNEYXRlID0gZmllbGRWYWx1ZSBpbnN0YW5jZW9mIERhdGU7IC8vIHN0b3JlIHRvIGF2b2lkIGNoZWNraW5nIHR3aWNlXG4gICAgICAgIGlmIChmaWVsZFZhbHVlID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkoZmllbGRWYWx1ZSkgfHwgdHlwZW9mIGZpZWxkVmFsdWUgPT09ICdvYmplY3QnICYmICFpc0RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmaWVsZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0RhdGUgJiYgb3B0aW9ucy51c2VEYXRlSXNvODYwMUZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAhb3B0aW9ucy51c2VMb2NhbGVGb3JtYXQgPyBmaWVsZFZhbHVlLnRvU3RyaW5nKCkgOiBmaWVsZFZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpbXMgdGhlIHJlY29yZCBmaWVsZCB2YWx1ZSwgaWYgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyJ3MgcHJvdmlkZWQgb3B0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyaW1SZWNvcmRGaWVsZFZhbHVlKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJpbUZpZWxkVmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLm1hcCh0cmltUmVjb3JkRmllbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJldmVudCBDU1YgaW5qZWN0aW9uIG9uIHN0cmluZ3MgaWYgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyJ3MgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICAgKiBNaXRpZ2F0aW9uIHdpbGwgYmUgZG9uZSBieSBlbnN1cmluZyB0aGF0IHRoZSBmaXJzdCBjaGFyYWN0ZXIgZG9lc24ndCBiZWluZyB3aXRoOlxuICAgICAqIEVxdWFscyAoPSksIFBsdXMgKCspLCBNaW51cyAoLSksIEF0IChAKSwgVGFiICgweDA5KSwgQ2FycmlhZ2UgcmV0dXJuICgweDBEKS5cbiAgICAgKiBNb3JlIGluZm86IGh0dHBzOi8vb3dhc3Aub3JnL3d3dy1jb21tdW5pdHkvYXR0YWNrcy9DU1ZfSW5qZWN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJldmVudENzdkluamVjdGlvbihmaWVsZFZhbHVlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnByZXZlbnRDc3ZJbmplY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUubWFwKHByZXZlbnRDc3ZJbmplY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGZpZWxkVmFsdWUgPT09ICdzdHJpbmcnICYmICF1dGlscy5pc051bWJlcihmaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLnJlcGxhY2UoL15bPStcXC1AXFx0XFxyXSsvZywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgcXVvdGF0aW9uIG1hcmtzIGluIHRoZSBmaWVsZCB2YWx1ZSwgaWYgbmVjZXNzYXJ5LCBhbmQgYXBwcm9wcmlhdGVseVxuICAgICAqIHdyYXBzIHRoZSByZWNvcmQgZmllbGQgdmFsdWUgaWYgaXQgY29udGFpbnMgYSBjb21tYSAoZmllbGQgZGVsaW1pdGVyKSxcbiAgICAgKiBxdW90YXRpb24gbWFyayAod3JhcCBkZWxpbWl0ZXIpLCBvciBhIGxpbmUgYnJlYWsgKENSTEYpXG4gICAgICovXG4gICAgZnVuY3Rpb24gd3JhcEZpZWxkVmFsdWVJZk5lY2Vzc2FyeShmaWVsZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHdyYXBEZWxpbWl0ZXIgPSBvcHRpb25zLmRlbGltaXRlci53cmFwO1xuICAgICAgICAvLyBlZy4gaW5jbHVkZXMgcXVvdGF0aW9uIG1hcmtzIChkZWZhdWx0IGRlbGltaXRlcilcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUuaW5jbHVkZXMob3B0aW9ucy5kZWxpbWl0ZXIud3JhcCkpIHtcbiAgICAgICAgICAgIC8vIGFkZCBhbiBhZGRpdGlvbmFsIHF1b3RhdGlvbiBtYXJrIGJlZm9yZSBlYWNoIHF1b3RhdGlvbiBtYXJrIGFwcGVhcmluZyBpbiB0aGUgZmllbGQgdmFsdWVcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnJlcGxhY2Uod3JhcERlbGltaXRlckNoZWNrUmVnZXgsIHdyYXBEZWxpbWl0ZXIgKyB3cmFwRGVsaW1pdGVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGUgZmllbGQgY29udGFpbnMgYSBjb21tYSAoZmllbGQgZGVsaW1pdGVyKSwgcXVvdGF0aW9uIG1hcmsgKHdyYXAgZGVsaW1pdGVyKSwgbGluZSBicmVhaywgb3IgQ1JMRlxuICAgICAgICAvLyAgIHRoZW4gZW5jbG9zZSBpdCBpbiBxdW90YXRpb24gbWFya3MgKHdyYXAgZGVsaW1pdGVyKVxuICAgICAgICBpZiAoZmllbGRWYWx1ZS5pbmNsdWRlcyhvcHRpb25zLmRlbGltaXRlci5maWVsZCkgfHxcbiAgICAgICAgICAgIGZpZWxkVmFsdWUuaW5jbHVkZXMob3B0aW9ucy5kZWxpbWl0ZXIud3JhcCkgfHxcbiAgICAgICAgICAgIGZpZWxkVmFsdWUubWF0Y2goY3JsZlNlYXJjaFJlZ2V4KSB8fFxuICAgICAgICAgICAgb3B0aW9ucy53cmFwQm9vbGVhbnMgJiYgKGZpZWxkVmFsdWUgPT09ICd0cnVlJyB8fCBmaWVsZFZhbHVlID09PSAnZmFsc2UnKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB2YWx1ZSBpbiBhIHdyYXAgZGVsaW1pdGVyIChxdW90YXRpb24gbWFya3MgYnkgZGVmYXVsdClcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPSB3cmFwRGVsaW1pdGVyICsgZmllbGRWYWx1ZSArIHdyYXBEZWxpbWl0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgQ1NWIHJlY29yZCBzdHJpbmcgYnkgam9pbmluZyB0aGUgZmllbGQgdmFsdWVzIHRvZ2V0aGVyIGJ5IHRoZSBmaWVsZCBkZWxpbWl0ZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUNzdlJvd0Zyb21SZWNvcmQocmVjb3JkRmllbGRWYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlY29yZEZpZWxkVmFsdWVzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQpO1xuICAgIH1cbiAgICAvKiogQ1NWIENPTVBPTkVOVCBDT01CSU5FUi9GSU5BTCBQUk9DRVNTT1IgKiovXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGZpbmFsIENTViBjb25zdHJ1Y3Rpb24gYnkgY29tYmluaW5nIHRoZSBmaWVsZHMgaW4gdGhlIGFwcHJvcHJpYXRlXG4gICAgICogb3JkZXIgZGVwZW5kaW5nIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zIHZhbHVlcyBhbmQgc2VuZHMgdGhlIGdlbmVyYXRlZCBDU1ZcbiAgICAgKiBiYWNrIHRvIHRoZSB1c2VyXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDc3ZGcm9tQ29tcG9uZW50cyhwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gcGFyYW1zLmhlYWRlciwgcmVjb3JkcyA9IHBhcmFtcy5yZWNvcmRTdHJpbmcsIFxuICAgICAgICAvLyBJZiB3ZSBhcmUgcHJlcGVuZGluZyB0aGUgaGVhZGVyLCB0aGVuIGFkZCBhbiBFT0wsIG90aGVyd2lzZSBqdXN0IHJldHVybiB0aGUgcmVjb3Jkc1xuICAgICAgICBjc3YgPSAob3B0aW9ucy5leGNlbEJPTSA/IGNvbnN0YW50c18xLmV4Y2VsQk9NIDogJycpICtcbiAgICAgICAgICAgIChvcHRpb25zLnByZXBlbmRIZWFkZXIgPyBoZWFkZXIgKyBvcHRpb25zLmRlbGltaXRlci5lb2wgOiAnJykgK1xuICAgICAgICAgICAgcmVjb3JkcztcbiAgICAgICAgcmV0dXJuIGNzdjtcbiAgICB9XG4gICAgLyoqIE1BSU4gQ09OVkVSVEVSIEZVTkNUSU9OICoqL1xuICAgIC8qKlxuICAgICAqIEludGVybmFsbHkgZXhwb3J0ZWQganNvbjJjc3YgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb252ZXJ0KGRhdGEpIHtcbiAgICAgICAgLy8gU2luZ2xlIGRvY3VtZW50LCBub3QgYW4gYXJyYXlcbiAgICAgICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpICYmICFkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTsgLy8gQ29udmVydCB0byBhbiBhcnJheSBvZiB0aGUgZ2l2ZW4gZG9jdW1lbnRcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgaGVhZGluZyBhbmQgdGhlbiBnZW5lcmF0ZSB0aGUgQ1NWIHdpdGggdGhlIGtleXMgdGhhdCBhcmUgaWRlbnRpZmllZFxuICAgICAgICBjb25zdCBoZWFkZXJGaWVsZHMgPSB7XG4gICAgICAgICAgICBoZWFkZXJGaWVsZHM6IHJldHJpZXZlSGVhZGVyRmllbGRzKGRhdGEpLFxuICAgICAgICAgICAgcmVjb3JkczogZGF0YSxcbiAgICAgICAgICAgIGhlYWRlcjogJycsXG4gICAgICAgICAgICByZWNvcmRTdHJpbmc6ICcnLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1bndpbmRlZCA9IHVud2luZFJlY29yZHNJZk5lY2Vzc2FyeShoZWFkZXJGaWVsZHMpO1xuICAgICAgICBjb25zdCBwcm9jZXNzZWQgPSBwcm9jZXNzUmVjb3Jkcyh1bndpbmRlZCk7XG4gICAgICAgIGNvbnN0IHdyYXBwZWQgPSB3cmFwSGVhZGVyRmllbGRzKHByb2Nlc3NlZCk7XG4gICAgICAgIGNvbnN0IHRyaW1tZWQgPSB0cmltSGVhZGVyRmllbGRzKHdyYXBwZWQpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWQgPSBnZW5lcmF0ZUNzdkhlYWRlcih0cmltbWVkKTtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlQ3N2RnJvbUNvbXBvbmVudHMoZ2VuZXJhdGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udmVydCxcbiAgICB9O1xufTtcbmV4cG9ydHMuSnNvbjJDc3YgPSBKc29uMkNzdjtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Dc3YySnNvbiA9IHZvaWQgMDtcbmNvbnN0IGRvY19wYXRoXzEgPSByZXF1aXJlKFwiZG9jLXBhdGhcIik7XG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcbmNvbnN0IHV0aWxzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3V0aWxzXCIpKTtcbmNvbnN0IENzdjJKc29uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCBlc2NhcGVkV3JhcERlbGltaXRlclJlZ2V4ID0gbmV3IFJlZ0V4cChvcHRpb25zLmRlbGltaXRlci53cmFwICsgb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCwgJ2cnKSwgZXhjZWxCT01SZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgY29uc3RhbnRzXzEuZXhjZWxCT00pLCB2YWx1ZVBhcnNlckZuID0gb3B0aW9ucy5wYXJzZVZhbHVlICYmIHR5cGVvZiBvcHRpb25zLnBhcnNlVmFsdWUgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnBhcnNlVmFsdWUgOiBKU09OLnBhcnNlO1xuICAgIC8qKlxuICAgICAqIFRyaW1zIHRoZSBoZWFkZXIga2V5LCBpZiBzcGVjaWZpZWQgYnkgdGhlIHVzZXIgdmlhIHRoZSBwcm92aWRlZCBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcktleShoZWFkZXJLZXkpIHtcbiAgICAgICAgaGVhZGVyS2V5ID0gcmVtb3ZlV3JhcERlbGltaXRlcnNGcm9tVmFsdWUoaGVhZGVyS2V5KTtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJpbUhlYWRlckZpZWxkcykge1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcktleS5zcGxpdCgnLicpXG4gICAgICAgICAgICAgICAgLm1hcCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQudHJpbSgpKVxuICAgICAgICAgICAgICAgIC5qb2luKCcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlcktleTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgdGhlIEpTT04gaGVhZGluZyBmcm9tIHRoZSBDU1ZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXRyaWV2ZUhlYWRpbmcobGluZXMpIHtcbiAgICAgICAgbGV0IGhlYWRlckZpZWxkcyA9IFtdO1xuICAgICAgICBpZiAob3B0aW9ucy5oZWFkZXJGaWVsZHMpIHtcbiAgICAgICAgICAgIGhlYWRlckZpZWxkcyA9IG9wdGlvbnMuaGVhZGVyRmllbGRzLm1hcCgoaGVhZGVyRmllbGQsIGluZGV4KSA9PiAoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9jZXNzSGVhZGVyS2V5KGhlYWRlckZpZWxkKSxcbiAgICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gR2VuZXJhdGUgYW5kIHJldHVybiB0aGUgaGVhZGluZyBrZXlzXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJSb3cgPSBsaW5lc1swXTtcbiAgICAgICAgICAgIGhlYWRlckZpZWxkcyA9IGhlYWRlclJvdy5tYXAoKGhlYWRlcktleSwgaW5kZXgpID0+ICh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHByb2Nlc3NIZWFkZXJLZXkoaGVhZGVyS2V5KSxcbiAgICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgcHJvdmlkZWQga2V5cywgZmlsdGVyIHRoZSBnZW5lcmF0ZWQga2V5cyB0byBqdXN0IHRoZSB1c2VyIHByb3ZpZGVkIGtleXMgc28gd2UgYWxzbyBoYXZlIHRoZSBrZXkgaW5kZXhcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmtleXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gb3B0aW9ucy5rZXlzOyAvLyBUeXBlU2NyaXB0IHR5cGUgY2hlY2tpbmcgd29yayBhcm91bmQgdG8gZ2V0IGl0IHRvIHJlY29nbml6ZSB0aGUgb3B0aW9uIGlzIG5vdCB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBoZWFkZXJGaWVsZHMgPSBoZWFkZXJGaWVsZHMuZmlsdGVyKChoZWFkZXJLZXkpID0+IGtleXMuaW5jbHVkZXMoaGVhZGVyS2V5LnZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpbmVzLFxuICAgICAgICAgICAgaGVhZGVyRmllbGRzLFxuICAgICAgICAgICAgcmVjb3JkTGluZXM6IFtdLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBFeGNlbCBCT00gdmFsdWUsIGlmIHNwZWNpZmllZCBieSB0aGUgb3B0aW9ucyBvYmplY3RcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdHJpcEV4Y2VsQk9NKGNzdikge1xuICAgICAgICBpZiAob3B0aW9ucy5leGNlbEJPTSkge1xuICAgICAgICAgICAgcmV0dXJuIGNzdi5yZXBsYWNlKGV4Y2VsQk9NUmVnZXgsICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3N2O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBzcGxpdHMgYSBsaW5lIHNvIHRoYXQgd2UgY2FuIGhhbmRsZSB3cmFwcGVkIGZpZWxkc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNwbGl0TGluZXMoY3N2KSB7XG4gICAgICAgIC8vIFBhcnNlIG91dCB0aGUgbGluZS4uLlxuICAgICAgICBjb25zdCBsaW5lcyA9IFtdLCBsYXN0Q2hhcmFjdGVySW5kZXggPSBjc3YubGVuZ3RoIC0gMSwgZW9sRGVsaW1pdGVyTGVuZ3RoID0gb3B0aW9ucy5kZWxpbWl0ZXIuZW9sLmxlbmd0aCwgc3RhdGVWYXJpYWJsZXMgPSB7XG4gICAgICAgICAgICBpbnNpZGVXcmFwRGVsaW1pdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcnNpbmdWYWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIGp1c3RQYXJzZWREb3VibGVRdW90ZTogZmFsc2UsXG4gICAgICAgICAgICBzdGFydEluZGV4OiAwXG4gICAgICAgIH07XG4gICAgICAgIGxldCBzcGxpdExpbmUgPSBbXSwgY2hhcmFjdGVyLCBjaGFyQmVmb3JlLCBjaGFyQWZ0ZXIsIG5leHROQ2hhciwgaW5kZXggPSAwO1xuICAgICAgICAvLyBMb29wIHRocm91Z2ggZWFjaCBjaGFyYWN0ZXIgaW4gdGhlIGxpbmUgdG8gaWRlbnRpZnkgd2hlcmUgdG8gc3BsaXQgdGhlIHZhbHVlc1xuICAgICAgICB3aGlsZSAoaW5kZXggPCBjc3YubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBDdXJyZW50IGNoYXJhY3RlclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY3N2W2luZGV4XTtcbiAgICAgICAgICAgIC8vIFByZXZpb3VzIGNoYXJhY3RlclxuICAgICAgICAgICAgY2hhckJlZm9yZSA9IGluZGV4ID8gY3N2W2luZGV4IC0gMV0gOiAnJztcbiAgICAgICAgICAgIC8vIE5leHQgY2hhcmFjdGVyXG4gICAgICAgICAgICBjaGFyQWZ0ZXIgPSBpbmRleCA8IGxhc3RDaGFyYWN0ZXJJbmRleCA/IGNzdltpbmRleCArIDFdIDogJyc7XG4gICAgICAgICAgICAvLyBOZXh0IG4gY2hhcmFjdGVycywgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGNoYXJhY3Rlciwgd2hlcmUgbiA9IGxlbmd0aChFT0wgZGVsaW1pdGVyKVxuICAgICAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIHRoZSBjaGVja2luZyBvZiBhbiBFT0wgZGVsaW1pdGVyIHdoZW4gaWYgaXQgaXMgbW9yZSB0aGFuIGEgc2luZ2xlIGNoYXJhY3RlciAoZWcuICdcXHJcXG4nKVxuICAgICAgICAgICAgbmV4dE5DaGFyID0gdXRpbHMuZ2V0TkNoYXJhY3RlcnMoY3N2LCBpbmRleCwgZW9sRGVsaW1pdGVyTGVuZ3RoKTtcbiAgICAgICAgICAgIGlmICgobmV4dE5DaGFyID09PSBvcHRpb25zLmRlbGltaXRlci5lb2wgJiYgIXN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgfHxcbiAgICAgICAgICAgICAgICBpbmRleCA9PT0gbGFzdENoYXJhY3RlckluZGV4KSAmJiBjaGFyQmVmb3JlID09PSBvcHRpb25zLmRlbGltaXRlci5maWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYW4gRU9MIGRlbGltaXRlciBvciB0aGUgZW5kIG9mIHRoZSBjc3YgYW5kIHRoZSBwcmV2aW91cyBjaGFyYWN0ZXIgaXMgYSBmaWVsZCBkZWxpbWl0ZXIuLi5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc3RhcnQgaW5kZXggaXMgdGhlIGN1cnJlbnQgaW5kZXggKGFuZCBzaW5jZSB0aGUgcHJldmlvdXMgY2hhcmFjdGVyIGlzIGEgY29tbWEpLFxuICAgICAgICAgICAgICAgIC8vICAgdGhlbiB0aGUgdmFsdWUgYmVpbmcgcGFyc2VkIGlzIGFuIGVtcHR5IHZhbHVlIGFjY29yZGluZ2x5LCBhZGQgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKG5leHROQ2hhciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZW9sICYmIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSBvcHRpb25zLmRlbGltaXRlci5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIHRoZSBlbmQgb2YgdGhlIENTViwgdGhlcmUncyBubyBuZXcgbGluZSwgYW5kIHRoZSBjdXJyZW50IGNoYXJhY3RlciBpcyBhIGNvbW1hXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gYWRkIGFuIGVtcHR5IHN0cmluZyBmb3IgdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGVyZSdzIGEgdmFsaWQgdmFsdWUsIGFuZCB0aGUgc3RhcnQgaW5kZXggaXNuJ3QgdGhlIGN1cnJlbnQgaW5kZXgsIGdyYWIgdGhlIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKGNzdi5zdWJzdHJpbmcoc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbGFzdCBjaGFyYWN0ZXIgaXMgYSBjb21tYSwgdGhlcmUncyBzdGlsbCBhbiBhZGRpdGlvbmFsIGltcGxpZWQgZmllbGQgdmFsdWUgdHJhaWxpbmcgdGhlIGNvbW1hLlxuICAgICAgICAgICAgICAgIC8vICAgU2luY2UgdGhpcyB2YWx1ZSBpcyBlbXB0eSwgd2UgcHVzaCBhbiBleHRyYSBlbXB0eSB2YWx1ZVxuICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICAvLyBGaW5hbGx5LCBwdXNoIHRoZSBzcGxpdCBsaW5lIHZhbHVlcyBpbnRvIHRoZSBsaW5lcyBhcnJheSBhbmQgY2xlYXIgdGhlIHNwbGl0IGxpbmVcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHNwbGl0TGluZSk7XG4gICAgICAgICAgICAgICAgc3BsaXRMaW5lID0gW107XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCA9IGluZGV4ICsgZW9sRGVsaW1pdGVyTGVuZ3RoO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciA9IGNoYXJBZnRlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSBsYXN0Q2hhcmFjdGVySW5kZXggJiYgY2hhcmFjdGVyID09PSBvcHRpb25zLmRlbGltaXRlci5maWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIENTViBhbmQgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGlzIGEgZmllbGQgZGVsaW1pdGVyXG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIHByZXZpb3VzbHkgc2VlbiB2YWx1ZSBhbmQgYWRkIGl0IHRvIHRoZSBsaW5lXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBjc3Yuc3Vic3RyaW5nKHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXgsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGxpdExpbmUucHVzaChwYXJzZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgLy8gVGhlbiBhZGQgYW4gZW1wdHkgc3RyaW5nIHRvIHRoZSBsaW5lIHNpbmNlIHRoZSBsYXN0IGNoYXJhY3RlciBiZWluZyBhIGZpZWxkIGRlbGltaXRlciBpbmRpY2F0ZXMgYW4gZW1wdHkgZmllbGRcbiAgICAgICAgICAgICAgICBzcGxpdExpbmUucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChzcGxpdExpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGxhc3RDaGFyYWN0ZXJJbmRleCB8fCBuZXh0TkNoYXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmVvbCAmJlxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFyZW4ndCBpbnNpZGUgd3JhcCBkZWxpbWl0ZXJzIG9yIGlmIHdlIGFyZSBidXQgdGhlIGNoYXJhY3RlciBiZWZvcmUgd2FzIGEgd3JhcCBkZWxpbWl0ZXIgYW5kIHdlIGRpZG4ndCBqdXN0IHNlZSB0d29cbiAgICAgICAgICAgICAgICAoIXN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciAmJiBjaGFyQmVmb3JlID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmICFzdGF0ZVZhcmlhYmxlcy5qdXN0UGFyc2VkRG91YmxlUXVvdGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGlmIHdlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgbGluZSBvciBjc3YgKGFuZCBjdXJyZW50IGNoYXJhY3RlciBpcyBub3QgYSBmaWVsZCBkZWxpbWl0ZXIpXG4gICAgICAgICAgICAgICAgY29uc3QgdG9JbmRleCA9IGluZGV4ICE9PSBsYXN0Q2hhcmFjdGVySW5kZXggfHwgY2hhckJlZm9yZSA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCA/IGluZGV4IDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIC8vIFJldHJpZXZlIHRoZSByZW1haW5pbmcgdmFsdWUgYW5kIGFkZCBpdCB0byB0aGUgc3BsaXQgbGluZSBsaXN0IG9mIHZhbHVlc1xuICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKGNzdi5zdWJzdHJpbmcoc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCwgdG9JbmRleCkpO1xuICAgICAgICAgICAgICAgIC8vIEZpbmFsbHksIHB1c2ggdGhlIHNwbGl0IGxpbmUgdmFsdWVzIGludG8gdGhlIGxpbmVzIGFycmF5IGFuZCBjbGVhciB0aGUgc3BsaXQgbGluZVxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goc3BsaXRMaW5lKTtcbiAgICAgICAgICAgICAgICBzcGxpdExpbmUgPSBbXTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4ID0gaW5kZXggKyBlb2xEZWxpbWl0ZXJMZW5ndGg7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gY2hhckFmdGVyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmIGNoYXJCZWZvcmUgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkICYmXG4gICAgICAgICAgICAgICAgIXN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgJiYgIXN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSB3cmFwIGRlbGltaXRlciBhZnRlciBhIGNvbW1hIGFuZCB3ZSBhcmVuJ3QgaW5zaWRlIGEgd3JhcCBkZWxpbWl0ZXJcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbmV4dCBjaGFyYWN0ZXIocykgYXJlIGFuIEVPTCBkZWxpbWl0ZXIsIHRoZW4gc2tpcCB0aGVtIHNvIHdlIGRvbid0IHBhcnNlIHdoYXQgd2UndmUgc2VlbiBhcyBhbm90aGVyIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmdldE5DaGFyYWN0ZXJzKGNzdiwgaW5kZXggKyAxLCBlb2xEZWxpbWl0ZXJMZW5ndGgpID09PSBvcHRpb25zLmRlbGltaXRlci5lb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggKz0gb3B0aW9ucy5kZWxpbWl0ZXIuZW9sLmxlbmd0aCArIDE7IC8vIFNraXAgcGFzdCBFT0xcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgoY2hhckJlZm9yZSAhPT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCB8fCBzdGF0ZVZhcmlhYmxlcy5qdXN0UGFyc2VkRG91YmxlUXVvdGUgJiYgY2hhckJlZm9yZSA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCkgJiZcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgdXRpbHMuZ2V0TkNoYXJhY3RlcnMoY3N2LCBpbmRleCArIDEsIGVvbERlbGltaXRlckxlbmd0aCkgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmVvbCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIGEgd3JhcCB3aGljaCBpcyBub3QgcHJlY2VkZWQgYnkgYSB3cmFwIGRlbGltIGFuZCB0aGUgbmV4dCBjaGFyYWN0ZXIgaXMgYW4gRU9MIGRlbGltIChpZS4gKlwiXFxuKVxuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBOZXh0IGl0ZXJhdGlvbiB3aWxsIHN1YnN0cmluZywgYWRkIHRoZSB2YWx1ZSB0byB0aGUgbGluZSwgYW5kIHB1c2ggdGhlIGxpbmUgb250byB0aGUgYXJyYXkgb2YgbGluZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiAoaW5kZXggPT09IDAgfHwgdXRpbHMuZ2V0TkNoYXJhY3RlcnMoY3N2LCBpbmRleCAtIGVvbERlbGltaXRlckxlbmd0aCwgZW9sRGVsaW1pdGVyTGVuZ3RoKSA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZW9sICYmICFzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyKSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaW5lIHN0YXJ0cyB3aXRoIGEgd3JhcCBkZWxpbWl0ZXIgKGllLiBcIiopXG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgY2hhckFmdGVyID09PSBvcHRpb25zLmRlbGltaXRlci5maWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSB3cmFwIGRlbGltaXRlciB3aXRoIGEgZmllbGQgZGVsaW1pdGVyIGFmdGVyIGl0IChpZS4gKlwiLClcbiAgICAgICAgICAgICAgICBzcGxpdExpbmUucHVzaChjc3Yuc3Vic3RyaW5nKHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXgsIGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPSBpbmRleCArIDI7IC8vIG5leHQgdmFsdWUgc3RhcnRzIGFmdGVyIHRoZSBmaWVsZCBkZWxpbWl0ZXJcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMucGFyc2luZ1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgY2hhckJlZm9yZSA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIuZmllbGQgJiZcbiAgICAgICAgICAgICAgICAhc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciAmJiBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgd3JhcCBkZWxpbWl0ZXIgd2l0aCBhIGZpZWxkIGRlbGltaXRlciBhZnRlciBpdCAoaWUuICxcIiopXG4gICAgICAgICAgICAgICAgc3BsaXRMaW5lLnB1c2goY3N2LnN1YnN0cmluZyhzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4LCBpbmRleCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5pbnNpZGVXcmFwRGVsaW1pdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCAmJiBjaGFyQWZ0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgaW5kZXggIT09IHN0YXRlVmFyaWFibGVzLnN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBydW4gaW50byBhbiBlc2NhcGVkIHF1b3RlIChpZS4gXCJcIikgc2tpcCBwYXN0IHRoZSBzZWNvbmQgcXVvdGVcbiAgICAgICAgICAgICAgICBpbmRleCArPSAyO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLmp1c3RQYXJzZWREb3VibGVRdW90ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLmZpZWxkICYmIGNoYXJCZWZvcmUgIT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiZcbiAgICAgICAgICAgICAgICBjaGFyQWZ0ZXIgIT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgIXN0YXRlVmFyaWFibGVzLmluc2lkZVdyYXBEZWxpbWl0ZXIgJiZcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgZmllbGQgZGVsaW1pdGVyIGFuZCBhcmUgbm90IGluc2lkZSB0aGUgd3JhcCBkZWxpbWl0ZXJzIChpZS4gKiwqKVxuICAgICAgICAgICAgICAgIHNwbGl0TGluZS5wdXNoKGNzdi5zdWJzdHJpbmcoc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCwgaW5kZXgpKTtcbiAgICAgICAgICAgICAgICBzdGF0ZVZhcmlhYmxlcy5zdGFydEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSBvcHRpb25zLmRlbGltaXRlci5maWVsZCAmJiBjaGFyQmVmb3JlID09PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmXG4gICAgICAgICAgICAgICAgY2hhckFmdGVyICE9PSBvcHRpb25zLmRlbGltaXRlci53cmFwICYmICFzdGF0ZVZhcmlhYmxlcy5wYXJzaW5nVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgZmllbGQgZGVsaW1pdGVyLCB0aGUgcHJldmlvdXMgY2hhcmFjdGVyIHdhcyBhIHdyYXAgZGVsaW1pdGVyLCBhbmQgdGhlXG4gICAgICAgICAgICAgICAgLy8gICBuZXh0IGNoYXJhY3RlciBpcyBub3QgYSB3cmFwIGRlbGltaXRlciAoaWUuIFwiLCopXG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuaW5zaWRlV3JhcERlbGltaXRlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0YXRlVmFyaWFibGVzLnBhcnNpbmdWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuc3RhcnRJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgdG8gdGhlIG5leHQgY2hhcmFjdGVyXG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGRvdWJsZSBxdW90ZSBzdGF0ZSB2YXJpYWJsZVxuICAgICAgICAgICAgc3RhdGVWYXJpYWJsZXMuanVzdFBhcnNlZERvdWJsZVF1b3RlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHJlY29yZCBsaW5lcyBmcm9tIHRoZSBzcGxpdCBDU1YgbGluZXMgYW5kIHNldHMgaXQgb24gdGhlIHBhcmFtcyBvYmplY3RcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXRyaWV2ZVJlY29yZExpbmVzKHBhcmFtcykge1xuICAgICAgICBpZiAob3B0aW9ucy5oZWFkZXJGaWVsZHMpIHsgLy8gVGhpcyBvcHRpb24gaXMgcGFzc2VkIGZvciBpbnN0YW5jZXMgd2hlcmUgdGhlIENTViBoYXMgbm8gaGVhZGVyIGxpbmVcbiAgICAgICAgICAgIHBhcmFtcy5yZWNvcmRMaW5lcyA9IHBhcmFtcy5saW5lcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gQWxsIGxpbmVzIGV4Y2VwdCBmb3IgdGhlIGhlYWRlciBsaW5lXG4gICAgICAgICAgICBwYXJhbXMucmVjb3JkTGluZXMgPSBwYXJhbXMubGluZXMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgdmFsdWUgZm9yIHRoZSByZWNvcmQgZnJvbSB0aGUgbGluZSBhdCB0aGUgcHJvdmlkZWQga2V5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJldHJpZXZlUmVjb3JkVmFsdWVGcm9tTGluZShoZWFkZXJGaWVsZCwgbGluZSkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHZhbHVlIGF0IHRoZSBrZXkncyBpbmRleCwgdXNlIGl0OyBvdGhlcndpc2UsIG51bGxcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsaW5lW2hlYWRlckZpZWxkLmluZGV4XTtcbiAgICAgICAgLy8gUGVyZm9ybSBhbnkgbmVjZXNzYXJ5IHZhbHVlIGNvbnZlcnNpb25zIG9uIHRoZSByZWNvcmQgdmFsdWVcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NSZWNvcmRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyB0aGUgcmVjb3JkJ3MgdmFsdWUgYnkgcGFyc2luZyB0aGUgZGF0YSB0byBlbnN1cmUgdGhlIENTViBpc1xuICAgICAqIGNvbnZlcnRlZCB0byB0aGUgSlNPTiB0aGF0IGNyZWF0ZWQgaXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1JlY29yZFZhbHVlKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGFuIGFycmF5IHJlcHJlc2VudGF0aW9uLCBjb252ZXJ0IGl0XG4gICAgICAgIGNvbnN0IHBhcnNlZEpzb24gPSBwYXJzZVZhbHVlKGZpZWxkVmFsdWUpO1xuICAgICAgICAvLyBJZiBwYXJzZWRKc29uIGlzIGFueXRoaW5nIGFzaWRlIGZyb20gYW4gZXJyb3IsIHRoZW4gd2Ugd2FudCB0byB1c2UgdGhlIHBhcnNlZCB2YWx1ZVxuICAgICAgICAvLyBUaGlzIGFsbG93cyB1cyB0byBpbnRlcnByZXQgdmFsdWVzIGxpa2UgJ251bGwnIC0tPiBudWxsLCAnZmFsc2UnIC0tPiBmYWxzZVxuICAgICAgICBpZiAoIXV0aWxzLmlzRXJyb3IocGFyc2VkSnNvbikgJiYgIXV0aWxzLmlzSW52YWxpZChwYXJzZWRKc29uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEpzb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmllbGRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaW1zIHRoZSByZWNvcmQgdmFsdWUsIGlmIHNwZWNpZmllZCBieSB0aGUgdXNlciB2aWEgdGhlIG9wdGlvbnMgb2JqZWN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gdHJpbVJlY29yZFZhbHVlKGZpZWxkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJpbUZpZWxkVmFsdWVzICYmIGZpZWxkVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgSlNPTiBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiBrZXlzIChkZXNpZ25hdGVkIGJ5IHRoZSBDU1YgaGVhZGVyKVxuICAgICAqICAgYW5kIHRoZSB2YWx1ZXMgKGZyb20gdGhlIGdpdmVuIGxpbmUpXG4gICAgICogQHJldHVybnMge09iamVjdH0gY3JlYXRlZCBqc29uIGRvY3VtZW50XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRG9jdW1lbnQoaGVhZGVyRmllbGRzLCBsaW5lKSB7XG4gICAgICAgIC8vIFJlZHVjZSB0aGUga2V5cyBpbnRvIGEgSlNPTiBkb2N1bWVudCByZXByZXNlbnRpbmcgdGhlIGdpdmVuIGxpbmVcbiAgICAgICAgcmV0dXJuIGhlYWRlckZpZWxkcy5yZWR1Y2UoKGRvY3VtZW50LCBoZWFkZXJGaWVsZCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSB2YWx1ZSBhdCB0aGUga2V5J3MgaW5kZXggaW4gdGhlIGxpbmUsIHNldCB0aGUgdmFsdWU7IG90aGVyd2lzZSBudWxsXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJldHJpZXZlUmVjb3JkVmFsdWVGcm9tTGluZShoZWFkZXJGaWVsZCwgbGluZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgdGhlIGtleSBhbmQgdmFsdWUgdG8gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBkb2NfcGF0aF8xLnNldFBhdGgpKGRvY3VtZW50LCBoZWFkZXJGaWVsZC52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2F0Y2ggYW55IGVycm9ycyB3aGVyZSBrZXkgcGF0aHMgYXJlIG51bGwgb3IgJycgYW5kIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG91dGVybW9zdCB3cmFwIGRlbGltaXRlcnMgZnJvbSBhIHZhbHVlLCBpZiB0aGV5IGFyZSBwcmVzZW50XG4gICAgICogT3RoZXJ3aXNlLCB0aGUgbm9uLXdyYXBwZWQgdmFsdWUgaXMgcmV0dXJuZWQgYXMgaXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwRGVsaW1pdGVyc0Zyb21WYWx1ZShmaWVsZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hhciA9IGZpZWxkVmFsdWVbMF0sIGxhc3RJbmRleCA9IGZpZWxkVmFsdWUubGVuZ3RoIC0gMSwgbGFzdENoYXIgPSBmaWVsZFZhbHVlW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIHRoZSBmaWVsZCBzdGFydHMgYW5kIGVuZHMgd2l0aCBhIHdyYXAgZGVsaW1pdGVyXG4gICAgICAgIGlmIChmaXJzdENoYXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXAgJiYgbGFzdENoYXIgPT09IG9wdGlvbnMuZGVsaW1pdGVyLndyYXApIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgZmllbGQgaXMganVzdCBhIHBhaXIgb2Ygd3JhcCBkZWxpbWl0ZXJzIFxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUubGVuZ3RoIDw9IDIgPyAnJyA6IGZpZWxkVmFsdWUuc3Vic3RyaW5nKDEsIGxhc3RJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuZXNjYXBlcyB3cmFwIGRlbGltaXRlcnMgYnkgcmVwbGFjaW5nIGR1cGxpY2F0ZXMgd2l0aCBhIHNpbmdsZSAoZWcuIFwiXCIgLT4gXCIpXG4gICAgICogVGhpcyBpcyBkb25lIGluIG9yZGVyIHRvIHBhcnNlIFJGQyA0MTgwIGNvbXBsaWFudCBDU1YgYmFjayB0byBKU09OXG4gICAgICovXG4gICAgZnVuY3Rpb24gdW5lc2NhcGVXcmFwRGVsaW1pdGVySW5GaWVsZChmaWVsZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlLnJlcGxhY2UoZXNjYXBlZFdyYXBEZWxpbWl0ZXJSZWdleCwgb3B0aW9ucy5kZWxpbWl0ZXIud3JhcCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1haW4gaGVscGVyIGZ1bmN0aW9uIHRvIGNvbnZlcnQgdGhlIENTViB0byB0aGUgSlNPTiBkb2N1bWVudCBhcnJheVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlY29yZExpbmVzKHBhcmFtcykge1xuICAgICAgICAvLyBGb3IgZWFjaCBsaW5lLCBjcmVhdGUgdGhlIGRvY3VtZW50IGFuZCBhZGQgaXQgdG8gdGhlIGFycmF5IG9mIGRvY3VtZW50c1xuICAgICAgICByZXR1cm4gcGFyYW1zLnJlY29yZExpbmVzLnJlZHVjZSgoZ2VuZXJhdGVkSnNvbk9iamVjdHMsIGxpbmUpID0+IHtcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lLm1hcCgoZmllbGRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gdGhlIG5lY2Vzc2FyeSBvcGVyYXRpb25zIG9uIGVhY2ggbGluZVxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSByZW1vdmVXcmFwRGVsaW1pdGVyc0Zyb21WYWx1ZShmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gdW5lc2NhcGVXcmFwRGVsaW1pdGVySW5GaWVsZChmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gdHJpbVJlY29yZFZhbHVlKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZWREb2N1bWVudCA9IGNyZWF0ZURvY3VtZW50KHBhcmFtcy5oZWFkZXJGaWVsZHMsIGxpbmUpO1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEpzb25PYmplY3RzLmNvbmNhdChnZW5lcmF0ZWREb2N1bWVudCk7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gcGFyc2UgdGhlIHByb3ZpZGVkIHZhbHVlLiBJZiBpdCBpcyBub3QgcGFyc2FibGUsIHRoZW4gYW4gZXJyb3IgaXMgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmdSZXByZXNlbnRhdGlvbih2YWx1ZSwgb3B0aW9ucykgJiYgIXV0aWxzLmlzRGF0ZVJlcHJlc2VudGF0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZEpzb24gPSB2YWx1ZVBhcnNlckZuKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBwYXJzZWQgdmFsdWUgaXMgYW4gYXJyYXksIHRoZW4gd2UgYWxzbyBuZWVkIHRvIHRyaW0gcmVjb3JkIHZhbHVlcywgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWRKc29uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRKc29uLm1hcCh0cmltUmVjb3JkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEpzb247XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbGx5IGV4cG9ydGVkIGNzdjJqc29uIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29udmVydChkYXRhKSB7XG4gICAgICAgIC8vIFNwbGl0IHRoZSBDU1YgaW50byBsaW5lcyB1c2luZyB0aGUgc3BlY2lmaWVkIEVPTCBvcHRpb25cbiAgICAgICAgY29uc3Qgc3RyaXBwZWQgPSBzdHJpcEV4Y2VsQk9NKGRhdGEpO1xuICAgICAgICBjb25zdCBzcGxpdCA9IHNwbGl0TGluZXMoc3RyaXBwZWQpO1xuICAgICAgICBjb25zdCBoZWFkaW5nID0gcmV0cmlldmVIZWFkaW5nKHNwbGl0KTsgLy8gUmV0cmlldmUgdGhlIGhlYWRpbmdzIGZyb20gdGhlIENTViwgdW5sZXNzIHRoZSB1c2VyIHNwZWNpZmllZCB0aGUga2V5c1xuICAgICAgICBjb25zdCBsaW5lcyA9IHJldHJpZXZlUmVjb3JkTGluZXMoaGVhZGluZyk7IC8vIFJldHJpZXZlIHRoZSByZWNvcmQgbGluZXMgZnJvbSB0aGUgQ1NWXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1SZWNvcmRMaW5lcyhsaW5lcyk7IC8vIFJldHJpZXZlIHRoZSBKU09OIGRvY3VtZW50IGFycmF5XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnZlcnQsXG4gICAgfTtcbn07XG5leHBvcnRzLkNzdjJKc29uID0gQ3N2Mkpzb247XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNzdjJqc29uID0gZXhwb3J0cy5qc29uMmNzdiA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuY29uc3QganNvbjJjc3ZfMSA9IHJlcXVpcmUoXCIuL2pzb24yY3N2XCIpO1xuY29uc3QgY3N2Mmpzb25fMSA9IHJlcXVpcmUoXCIuL2NzdjJqc29uXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuZnVuY3Rpb24ganNvbjJjc3YoZGF0YSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGJ1aWx0T3B0aW9ucyA9ICgwLCB1dGlsc18xLmJ1aWxkSjJDT3B0aW9ucykob3B0aW9ucyA/PyB7fSk7XG4gICAgLy8gVmFsaWRhdGUgdGhlIHBhcmFtZXRlcnMgYmVmb3JlIGNhbGxpbmcgdGhlIGNvbnZlcnRlcidzIGNvbnZlcnQgZnVuY3Rpb25cbiAgICAoMCwgdXRpbHNfMS52YWxpZGF0ZSkoZGF0YSwgdXRpbHNfMS5pc09iamVjdCwgY29uc3RhbnRzXzEuZXJyb3JzLmpzb24yY3N2KTtcbiAgICByZXR1cm4gKDAsIGpzb24yY3N2XzEuSnNvbjJDc3YpKGJ1aWx0T3B0aW9ucykuY29udmVydChkYXRhKTtcbn1cbmV4cG9ydHMuanNvbjJjc3YgPSBqc29uMmNzdjtcbmZ1bmN0aW9uIGNzdjJqc29uKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBidWlsdE9wdGlvbnMgPSAoMCwgdXRpbHNfMS5idWlsZEMySk9wdGlvbnMpKG9wdGlvbnMgPz8ge30pO1xuICAgIC8vIFZhbGlkYXRlIHRoZSBwYXJhbWV0ZXJzIGJlZm9yZSBjYWxsaW5nIHRoZSBjb252ZXJ0ZXIncyBjb252ZXJ0IGZ1bmN0aW9uXG4gICAgKDAsIHV0aWxzXzEudmFsaWRhdGUpKGRhdGEsIHV0aWxzXzEuaXNTdHJpbmcsIGNvbnN0YW50c18xLmVycm9ycy5jc3YyanNvbik7XG4gICAgcmV0dXJuICgwLCBjc3YyanNvbl8xLkNzdjJKc29uKShidWlsdE9wdGlvbnMpLmNvbnZlcnQoZGF0YSk7XG59XG5leHBvcnRzLmNzdjJqc29uID0gY3N2Mmpzb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcbmltcG9ydCB7IHVzZU5vdGljZSwgdXNlUmVjb3JkcyB9IGZyb20gXCJhZG1pbmpzXCI7XHJcbmltcG9ydCB7IGpzb24yY3N2IH0gZnJvbSBcImpzb24tMi1jc3ZcIjtcclxuXHJcbmNvbnN0IEV4cG9ydEJ1dHRvbiA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVzb3VyY2UgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG4gIGNvbnN0IHsgcmVjb3JkcyB9ID0gdXNlUmVjb3JkcyhyZXNvdXJjZS5pZCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHJlY29yZHMgJiYgcmVjb3Jkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVjb3Jkcy5tYXAoKHJlY29yZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGl0ZW0gPSByZWNvcmQucGFyYW1zO1xyXG4gICAgICAgICAgY29uc3QgbWVtYmVyT2JqZWN0ID0geyAuLi5pdGVtIH07XHJcbiAgICAgICAgICBkZWxldGUgbWVtYmVyT2JqZWN0Ll9pZDtcclxuXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBTTjogaW5kZXggKyAxLFxyXG4gICAgICAgICAgICBcIkZ1bGwgTmFtZVwiOiBgJHtpdGVtLmZpcnN0X25hbWV9ICR7aXRlbS5sYXN0X25hbWV9YCxcclxuICAgICAgICAgICAgLi4ubWVtYmVyT2JqZWN0LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY3N2ID0ganNvbjJjc3YocmVzdWx0KTtcclxuICAgICAgICBjb25zdCB1dGY4Qm9tID0gXCJcXHVGRUZGXCI7XHJcbiAgICAgICAgY29uc3QgY3N2V2l0aEJvbSA9IHV0ZjhCb20gKyBjc3Y7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IG5vd1xyXG4gICAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHtcclxuICAgICAgICAgICAgZGF5OiBcIjItZGlnaXRcIixcclxuICAgICAgICAgICAgbW9udGg6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFxEL2csIFwiX1wiKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gbm93XHJcbiAgICAgICAgICAudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwge1xyXG4gICAgICAgICAgICBob3VyMTI6IGZhbHNlLFxyXG4gICAgICAgICAgICBob3VyOiBcIjItZGlnaXRcIixcclxuICAgICAgICAgICAgbWludXRlOiBcIjItZGlnaXRcIixcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFxEL2csIFwiX1wiKTtcclxuXHJcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBgZXhwb3J0XyR7Zm9ybWF0dGVkRGF0ZX1fdGltZV8ke2Zvcm1hdHRlZFRpbWV9LmNzdmA7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIEJsb2IgZnJvbSB0aGUgQ1NWIGRhdGFcclxuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdldpdGhCb21dLCB7XHJcbiAgICAgICAgICB0eXBlOiBcInRleHQvY3N2O2NoYXJzZXQ9dXRmLTg7XCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGxpbmsgZWxlbWVudCwgaGlkZSBpdCwgZGlyZWN0IGl0IHRvd2FyZHMgdGhlIGJsb2IsIGFuZCB0aGVuIHRyaWdnZXIgYSBjbGlja1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBpZiAobGluay5kb3dubG9hZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XHJcbiAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIGZpbGVOYW1lKTtcclxuICAgICAgICAgIGxpbmsuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogXCJFeHBvcnQgc3VjY2Vzc2Z1bFwiLCB0eXBlOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgICAgbWVzc2FnZTogXCJObyBkYXRhIGZvdW5kIGluIHRoZSBjb2xsZWN0aW9uLiBTa2lwcGluZyBDU1YgZ2VuZXJhdGlvbi5cIixcclxuICAgICAgICAgIHR5cGU6IFwiaW5mb1wiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXhwb3J0IGZhaWxlZDpcIiwgZXJyb3IpO1xyXG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiBcIkV4cG9ydCBmYWlsZWRcIiwgdHlwZTogXCJlcnJvclwiIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT5FeHBvcnQgQ1NWPC9CdXR0b24+O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwb3J0QnV0dG9uO1xyXG4iLCJpbXBvcnQgeyBEcm9wWm9uZSwgRHJvcFpvbmVJdGVtLCBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0LCB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBFZGl0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZDtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KTtcbiAgICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSk7XG4gICAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGUoW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgICAgIGlmICgodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHNldE9yaWdpbmFsS2V5KGtleSk7XG4gICAgICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKTtcbiAgICAgICAgfVxuICAgIH0sIFtrZXksIG9yaWdpbmFsS2V5XSk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXMpID0+IHtcbiAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcyk7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpO1xuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW107XG4gICAgICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSk7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSwgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZSwgeyBvbkNoYW5nZTogb25VcGxvYWQsIG11bHRpcGxlOiBjdXN0b20ubXVsdGlwbGUsIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICAgICAgfSwgZmlsZXM6IGZpbGVzVG9VcGxvYWQgfSksXG4gICAgICAgICFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGZpbGVuYW1lOiBrZXksIHNyYzogcGF0aCwgb25SZW1vdmU6IGhhbmRsZVJlbW92ZSB9KSksXG4gICAgICAgIGN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGtleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsga2V5OiBzaW5nbGVLZXksIGZpbGVuYW1lOiBzaW5nbGVLZXksIHNyYzogcGF0aFtpbmRleF0sIG9uUmVtb3ZlOiAoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpIH0pKSA6ICcnO1xuICAgICAgICB9KSkpIDogJycpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFZGl0O1xuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAgICdhdWRpby9hYWMnLFxuICAgICdhdWRpby9taWRpJyxcbiAgICAnYXVkaW8veC1taWRpJyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL29nZycsXG4gICAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICAgJ2F1ZGlvL29wdXMnLFxuICAgICdhdWRpby93YXYnLFxuICAgICdhdWRpby93ZWJtJyxcbiAgICAnYXVkaW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgICAndmlkZW8vbXBlZycsXG4gICAgJ3ZpZGVvL29nZycsXG4gICAgJ3ZpZGVvL21wMnQnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vM2dwcCcsXG4gICAgJ3ZpZGVvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICAgJ2ltYWdlL2JtcCcsXG4gICAgJ2ltYWdlL2dpZicsXG4gICAgJ2ltYWdlL2pwZWcnLFxuICAgICdpbWFnZS9wbmcnLFxuICAgICdpbWFnZS9zdmcreG1sJyxcbiAgICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgICAnaW1hZ2UvdGlmZicsXG4gICAgJ2ltYWdlL3dlYnAnLFxuXTtcbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24vemlwJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl07XG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl07XG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgICAndGV4dC9jc3MnLFxuICAgICd0ZXh0L2NzdicsXG4gICAgJ3RleHQvaHRtbCcsXG4gICAgJ3RleHQvY2FsZW5kYXInLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ3RleHQvcGxhaW4nLFxuICAgICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICd0ZXh0L3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgICAnYXBwbGljYXRpb24vcGRmJyxcbl07XG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgICAnZm9udC9vdGYnLFxuICAgICdmb250L3R0ZicsXG4gICAgJ2ZvbnQvd29mZicsXG4gICAgJ2ZvbnQvd29mZjInLFxuXTtcbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgICAnYXBwbGljYXRpb24veC1zaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAndm5kLnZpc2lvJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAgIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAgIC4uLlRleHRNaW1lVHlwZXMsXG4gICAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgICAuLi5Gb250TWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuXTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlLmpzJztcbmNvbnN0IFNpbmdsZUZpbGUgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHM7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBwYXRoLCBzdHlsZTogeyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfSwgYWx0OiBuYW1lIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiLCB7IGNvbnRyb2xzOiB0cnVlLCBzcmM6IHBhdGggfSxcbiAgICAgICAgICAgICAgICBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVwiLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiYXVkaW9cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2luZDogXCJjYXB0aW9uc1wiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgYXM6IFwiYVwiLCBocmVmOiBwYXRoLCBtbDogXCJkZWZhdWx0XCIsIHNpemU6IFwic21cIiwgcm91bmRlZDogdHJ1ZSwgdGFyZ2V0OiBcIl9ibGFua1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb24sIHsgaWNvbjogXCJEb2N1bWVudERvd25sb2FkXCIsIGNvbG9yOiBcIndoaXRlXCIsIG1yOiBcImRlZmF1bHRcIiB9KSxcbiAgICAgICAgICAgIG5hbWUpKSk7XG59O1xuY29uc3QgRmlsZSA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSk7XG4gICAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBwYXRoOiBwYXRoLCBuYW1lOiBuYW1lLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZSB9KSk7XG4gICAgfVxuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnO1xuICAgICAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBrZXk6IHNpbmdsZVBhdGgsIHBhdGg6IHNpbmdsZVBhdGgsIG5hbWU6IG5hbWVbaW5kZXhdLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZVtpbmRleF0gfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IExpc3QgPSAocHJvcHMpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IDEwMCwgLi4ucHJvcHMgfSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZVByb3BlcnR5IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHRyYW5zbGF0ZVByb3BlcnR5KHByb3BlcnR5LmxhYmVsLCBwcm9wZXJ0eS5yZXNvdXJjZUlkKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogXCIxMDAlXCIsIC4uLnByb3BzIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2hvdztcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEFwcHJvdmVNZW1iZXIgZnJvbSAnLi4vYXBpL0FwcHJvdmVNZW1iZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkFwcHJvdmVNZW1iZXIgPSBBcHByb3ZlTWVtYmVyXG5pbXBvcnQgUmVqZWN0TWVtYmVyIGZyb20gJy4uL2FwaS9SZWplY3RNZW1iZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJlamVjdE1lbWJlciA9IFJlamVjdE1lbWJlclxuaW1wb3J0IEV4cG9ydEJ1dHRvbiBmcm9tICcuLi9hcGkvRXhwb3J0QnV0dG9uJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5FeHBvcnRCdXR0b24gPSBFeHBvcnRCdXR0b25cbmltcG9ydCBVcGxvYWRFZGl0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZExpc3RDb21wb25lbnQgPSBVcGxvYWRMaXN0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkU2hvd0NvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkU2hvd0NvbXBvbmVudCA9IFVwbG9hZFNob3dDb21wb25lbnQiXSwibmFtZXMiOlsiaXNVbmRlZmluZWQiLCJpc1N0cmluZyIsImlzTnVtYmVyIiwiaXNPYmplY3QiLCJ1dGlscyIsInByb3RvdHlwZSIsImVuY29kZSIsIlVSTFNlYXJjaFBhcmFtcyIsIkZvcm1EYXRhIiwiQmxvYiIsInBsYXRmb3JtIiwiZGVmYXVsdHMiLCJBeGlvc0hlYWRlcnMiLCJ2YWxpZGF0b3JzIiwiQXhpb3MiLCJDYW5jZWxUb2tlbiIsIkh0dHBTdGF0dXNDb2RlIiwiQXBwcm92ZU1lbWJlciIsInByb3BzIiwiYXBpX3VybCIsInJlY29yZCIsInJlc291cmNlIiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwidGFyZ2V0IiwiYXBwZW5kIiwicmVzIiwiYXhpb3MiLCJwdXQiLCJwYXJhbXMiLCJfaWQiLCJoZWFkZXJzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJhbGVydCIsInJlc3BvbnNlIiwiZGF0YSIsIm1lc3NhZ2UiLCJoYW5kbGVBcHByb3ZlIiwicG9zdCIsImlkIiwicmVkaXJlY3RVcmwiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJ2YXJpYW50Iiwid2lkdGgiLCJwIiwibSIsIm10IiwiaXNOZXciLCJvblN1Ym1pdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiaHRtbEZvciIsIklucHV0IiwibmFtZSIsInBsYWNlaG9sZGVyIiwicmVxdWlyZWQiLCJ0eXBlIiwiYWNjZXB0IiwiQnV0dG9uIiwib25DbGljayIsIlJlamVjdE1lbWJlciIsInRoZW4iLCJUZXh0QXJlYSIsInVuaXF1ZSIsImZsYXR0ZW4iLCJ0aGlzIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJkb2NfcGF0aF8xIiwiY29uc3RhbnRzXzEiLCJfX2NyZWF0ZUJpbmRpbmciLCJfX3NldE1vZHVsZURlZmF1bHQiLCJfX2ltcG9ydFN0YXIiLCJqc29uMmNzdiIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiY3N2Mmpzb24iLCJFeHBvcnRCdXR0b24iLCJhZGROb3RpY2UiLCJ1c2VOb3RpY2UiLCJyZWNvcmRzIiwidXNlUmVjb3JkcyIsImhhbmRsZUNsaWNrIiwibGVuZ3RoIiwicmVzdWx0IiwibWFwIiwiaW5kZXgiLCJpdGVtIiwibWVtYmVyT2JqZWN0IiwiU04iLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiY3N2IiwidXRmOEJvbSIsImNzdldpdGhCb20iLCJub3ciLCJEYXRlIiwiZm9ybWF0dGVkRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImRheSIsIm1vbnRoIiwieWVhciIsInJlcGxhY2UiLCJmb3JtYXR0ZWRUaW1lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiaG91cjEyIiwiaG91ciIsIm1pbnV0ZSIsImZpbGVOYW1lIiwiYmxvYiIsImxpbmsiLCJkb2N1bWVudCIsImRvd25sb2FkIiwidW5kZWZpbmVkIiwidXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsImNvbnNvbGUiLCJ1c2VUcmFuc2xhdGlvbiIsImZsYXQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkRyb3Bab25lIiwiRHJvcFpvbmVJdGVtIiwiSWNvbiIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIlVwbG9hZEVkaXRDb21wb25lbnQiLCJVcGxvYWRMaXN0Q29tcG9uZW50IiwiVXBsb2FkU2hvd0NvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUVlLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7RUFDMUMsRUFBRSxPQUFPLFNBQVMsSUFBSSxHQUFHO0VBQ3pCLElBQUksT0FBTyxFQUFFLENB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RSxPQUFPQSxPQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJQSxPQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVELENBQUM7QUFDRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFO0VBQzdCLEVBQUUsT0FBT0EsT0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDNUQsQ0FBQztBQUNEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7RUFDcEMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxDQUFDO0VBQ3hCLEVBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO0VBQ3REO0VBQ0EsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ2xDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0VBQ2xELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQzNCLENBQUM7QUFDRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFO0VBQzFCLEVBQUUsT0FBT0EsT0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFD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SSxRQUFRdEYsc0JBQUssQ0FBQyxhQUFhLENBQUNVLHNCQUFTLEVBQUUsSUFBSTtFQUMvQyxRQUFRVixzQkFBSyxDQUFDLGFBQWEsQ0FBQ1csa0JBQUssRUFBRSxJQUFJLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDaEcsUUFBUVgsc0JBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtFQUNqRSxDQUFDOztFQ1ZENkYsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0VBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQzNILGFBQWEsR0FBR0EsYUFBYSxDQUFBO0VBRXBEMEgsT0FBTyxDQUFDQyxjQUFjLENBQUN6RSxZQUFZLEdBQUdBLFlBQVksQ0FBQTtFQUVsRHdFLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDeEQsWUFBWSxHQUFHQSxZQUFZLENBQUE7RUFFbER1RCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0MsbUJBQW1CLEdBQUdBLElBQW1CLENBQUE7RUFFaEVGLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRSxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtFQUVoRUgsT0FBTyxDQUFDQyxjQUFjLENBQUNHLG1CQUFtQixHQUFHQSxJQUFtQjs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDUxLDUyLDUzLDU0LDU1LDU2LDU3LDU4LDU5LDYxLDYyLDYzLDY0LDY1XX0=
