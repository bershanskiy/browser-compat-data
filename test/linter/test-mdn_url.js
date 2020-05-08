const chalk = require('chalk');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Used for dictionaries where slugs have format /dictionaryName#valueName
const dictionaryPattern = {
  __default: {
    __slug: key => '#' + key,
  },
};

const noSlugPattern = {
  __slug: '',
};

const capitalizePattern = {
  __slug: key => '/' + capitalize(key),
};

/*
 * Map of data keys to URL segments
 */
const URLPatternMap = {
  __slug: 'https://developer.mozilla.org/docs',
  api: {
    __slug: '/Web/API',
    // TODO: simplify
    CryptoKey: {
      usages: noSlugPattern,
      type: noSlugPattern,
      extractable: noSlugPattern,
      algorithm: noSlugPattern,
    },
    XMLHttpRequest: {
      responseType: dictionaryPattern,
      send: dictionaryPattern,
    },
    WebGLRenderingContext: {
      '^uniform[1234][fi]v?$': {
        __slug: '/uniform',
      },
      '^vertexAttrib[1234]fv?$': {
        __slug: '/vertexAttrib',
      },
      '^uniformMatrix[234]fv?$': {
        __slug: '/uniformMatrix',
      },
      '^texParameter[if]$': {
        __slug: '/texParameter',
      },
    },
    WebGL2RenderingContext: {
      '^vertexAttribI4u?iv?': {
        __slug: '/vertexAttribI',
      },
      '^uniformMatrix[234]x?[234]?fv$': {
        __slug: '/uniformMatrix',
      },
      '^uniform[1234](u?i|f)v?$': {
        __slug: '/uniform',
      },
      '^samplerParameter[if]$': {
        __slug: '/samplerParameter',
      },
      '^clearBuffer': {
        __slug: '/clearBuffer',
      },
    },
    PaintWorkletGlobalScope: {
      // See https://github.com/mdn/browser-compat-data/pull/4416#issuecomment-517339589
      __slug: '/PaintWorklet',
    },
    RTCIceCredentialType: dictionaryPattern,
    ServiceWorkerRegistration: {
      showNotification: {
        __default: {
          __slug: '',
        },
      },
    },
    XREnvironmentBlendMode: dictionaryPattern,
    XREye: dictionaryPattern,
    XRSessionMode: dictionaryPattern,
  },
  css: {
    __slug: '/Web/CSS',
    content: noSlugPattern,
    properties: {
      __slug: '',
      __default: {
        __default: {
          __slug: '',
        },
      },
      'background-image': {
        __slug: '',
        gradients: {
          // TODO: consider renaming in MDN from gradients to gradient
          __slug: '/gradient',
        },
        'image-rect': {
          // TODO: consider moving MDN page from /-moz-image-rect to /image-rect
          __slug: '/-moz-image-rect',
        },
      },
      'font-variant-alternates': {
        __default: {
          __slug: key => '#' + key.replace('_', '-') + '()',
        },
      },
      'grid-template-columns': noSlugPattern,
    },
    types: {
      __slug: '',
      angle: dictionaryPattern,
      'basic-shape': {
        __default: {
          __slug: key => '#' + key + '()',
        },
        animation: {
          __slug: '#Interpolation_of_basic_shapes',
        },
      },
      global_keywords: noSlugPattern,
      image: {
        __slug: '',
        gradient: {
          __slug: '',
        },
      },
    },
    'at-rules': {
      __slug: '',
      __default: {
        __slug: key => `/@${key}`,
      },
      'font-feature-values': {
        __slug: key => `/@${key}`,
        __default: {
          __slug: key => '#@' + key,
        },
      },
    },
    selectors: {
      __slug: '',
      namespace: {
        // This property relates to @namespace selector (from at-rules/@namespace)
        // See https://github.com/mdn/browser-compat-data/pull/750
        __slug: '/@namespace',
      },
      universal: {
        __slug: '/Universal_selectors',
      },
      __default: {
        __slug: key => `/::?${key}`,
      },
    },
  },
  html: {
    __slug: '/Web',
    elements: {
      __slug: '/HTML/Element',
      '^h[123456]$': {
        __slug: '/Heading_Elements',
      },
      input: {
        __default: {
          // Removes 'input-' from 'input-something'
          __slug: key => '/' + key.substring('input-'.length),
        },
      },
    },
    global_attributes: {
      __slug: '/HTML/Global_attributes',
    },
    manifest: {
      __slug: '/Manifest',
    },
  },
  http: {
    __slug: '/Web/HTTP',
    methods: {
      __slug: '/Methods',
    },
    headers: {
      __slug: '/Headers',
      csp: {
        __slug: '',
        'Content-Security-Policy': {
          '^(unsafe-hashes|strict-dynamic)$': {
            __slug: key => '/script-src#' + key,
          },
        },
      },
      'Clear-Site-Data': dictionaryPattern,
    },
    status: {
      __slug: '/Status',
    },
  },
  mathml: {
    __slug: '/Web/MathML',
    elements: {
      __slug: '/Element',
      __default: {
        __default: {
          // TODO: is this convention really necessary?
          __slug: key => `#attr-${key}`,
        },
      },
    },
  },
  javascript: {
    __slug: '/Web/JavaScript/Reference',
    classes: {
      __slug: '/Classes',
    },
    functions: {
      __slug: '/Functions',
    },
    grammar: {
      __slug: '/Lexical_grammar',
    },
    operators: {
      __slug: '/Operators',
      arithmetic: {
        __slug: '/Arithmetic_Operators',
        __default: {
          __slug: key => '#' + capitalize(key),
        },
      },
      assignment: {
        __slug: '/Assignment_Operators',
        __default: {
          __slug: key => '#' + capitalize(key) + '_assignment',
        },
        simple: {
          __slug: '#Assignment',
        },
        '^bitwise_': {
          __slug: key =>
            '#Bitwise_' +
            key.substring('Bitwise_'.length).toUpperCase() +
            '_assignment',
        },
      },
      bitwise: {
        __slug: '/Bitwise_Operators',
        __default: {
          __slug: key => '#Bitwise_' + key.toUpperCase(),
        },
        _shift$: {
          __slug: key => '#' + capitalize(key),
        },
      },
      logical: {
        __slug: '/Logical_Operators',
        __default: {
          __slug: key => '#Logical_' + key.toUpperCase(),
        },
      },
      _star$: {
        __slug: key => '/' + key.replace('_star', '*'),
      },
    },
    builtins: {
      __slug: '/Global_Objects',
      Object: {
        '^(define|lookup)(Getter|Setter)$': {
          __slug: key => '/__' + key + '__',
        },
      },
    },
    statements: {
      __slug: '/Statements',
      generator_function: {
        __slug: '/function*',
      },
    },
  },
  svg: {
    __slug: '/Web/SVG',
    attributes: {
      __slug: '/Attribute',
      conditional_processing: noSlugPattern,
      core: noSlugPattern,
      document: noSlugPattern,
      events: {
        __slug: '',
        __default: noSlugPattern,
      },
      graphical: noSlugPattern,
      presentation: noSlugPattern,
      style: noSlugPattern,
      xlink: {
        __default: {
          __slug: key => ':' + key.slice('xlink_'.length),
        },
      },
    },
    elements: {
      __slug: '/Element',
    },
  },
  webdriver: {
    __slug: '/Web/WebDriver',
    commands: {
      __slug: '/Commands',
    },
  },
  webextensions: {
    __slug: '/Mozilla/Add-ons/WebExtensions',
    api: {
      __slug: '/API',
      devtools: {
        __default: {
          // TODO: may be, move the articles?
          __slug: key => `.${key}`,
        },
      },
    },
    manifest: {
      __slug: '/manifest.json',
      content_security_policy: dictionaryPattern,
      theme: dictionaryPattern,
      theme_experiment: {
        __default: {
          // See https://github.com/mdn/browser-compat-data/pull/5800#issuecomment-596950381
          __slug: '#Syntax',
        },
      },
    },
    match_patterns: capitalizePattern,
  },
  xpath: {
    __slug: '/Web/XPath',
    axes: capitalizePattern,
  },
  xslt: {
    __slug: '',
    exslt: {
      __slug: '/Web/EXSLT',
    },
    elements: {
      __slug: '/Web/XSLT/Element',
      stylesheet: {
        __default: {
          __slug: key => `#attr-${key}`,
        },
      },
    },
  },
};

/** Given a MDN URL pattern map and a key,
 * finds the best matching pattern.
 */
function findMatch(key, URLPatternMap) {
  // Fast-path an exact match
  const exactMatch = URLPatternMap && URLPatternMap[key];
  if (exactMatch) return exactMatch;

  // Return the first matching noSlugPattern for simplicity (and performance)
  // Note: developer needs to ensure patterns are specific enough to be unique
  for (const pattern in URLPatternMap)
    if (key.match(pattern)) return URLPatternMap[pattern];

  // Fallback to default, if such exists
  return URLPatternMap && URLPatternMap.__default;
}

/**
 * @param {Identifier} data
 * @param {import('../utils').Logger} logger
 */
function hasCorrectMDNURLRecursive(data, logger) {
  // stack variable is used to minimize the real VM stack and use depth-first
  // search, saving some resources.
  const stack = [
    {
      currData: data,
      key: '',
      pattern: URLPatternMap.__slug,
      URLPatternMap: URLPatternMap,
    },
  ];

  while (stack.length > 0) {
    const item = stack.pop();

    for (const key in item.currData) {
      const currData = item.currData[key];
      const actualURL = currData && currData.mdn_url;
      const URLPatternMap = findMatch(key, item.URLPatternMap);

      const slug = URLPatternMap && URLPatternMap.__slug;
      const newItem = {
        currData: currData,
        key: item.key + '.' + key,
        pattern: undefined,
        URLPatternMap: URLPatternMap,
      };

      switch (key) {
        // Check the actual MDN URL, if such exists
        case '__compat':
          if (actualURL && !actualURL.match(item.pattern)) {
            logger.error(chalk`{red Incorrect mdn_url for {bold ${item.key.slice(
              1,
            )}}}
              {yellow Actual: {bold "${actualURL || ''}"}}
              {green Expected: {bold "${item.pattern}"}}`);
          }
          break;

        // worker_support and secure_context_required do not need URLs
        case 'worker_support':
        // fallthrough
        case 'secure_context_required':
          if (actualURL !== undefined) {
            logger.error(chalk`{red Incorrect mdn_url for {bold ${key}}}
              {yellow Actual: {bold "${actualURL || ''}"}}
              {green Expected: {bold undefined}}`);
            continue;
          }
          // no need to push on stack
          break;

        //
        default:
          switch (typeof slug) {
            case 'string':
              newItem.pattern = item.pattern + slug;
              break;
            case 'function':
              newItem.pattern = item.pattern + slug(key);
              break;
            case 'undefined':
              newItem.pattern = item.pattern + '/' + key;
              break;
            default:
              console.log('DEFAULT');
          }

          stack.push(newItem);
          break;
      }
    }
  }
}

/**
 * @param {string} filename
 */
function testMDNUrls(filename) {
  /** @type {Identifier} */
  const data = require(filename);

  /** @type {string[]} */
  const errors = [];
  const logger = {
    /** @param {...unknown} message */
    error: (...message) => {
      errors.push(message.join(' '));
    },
  };

  hasCorrectMDNURLRecursive(data, logger);

  if (errors.length) {
    console.error(
      chalk`{red   mdn_urls – {bold ${errors.length}} ${
        errors.length === 1 ? 'error' : 'errors'
      }:}`,
    );
    for (const error of errors) {
      console.error(`    ${error}`);
    }
    return true;
  }
  return false;
}

module.exports = testMDNUrls;
