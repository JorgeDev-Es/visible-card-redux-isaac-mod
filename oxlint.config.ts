import { defineConfig } from "oxlint"
import "eslint-plugin-regexp"
import "@stylistic/eslint-plugin"
import "eslint-plugin-perfectionist"
import "eslint-plugin-complete"

const jsPlugins = [
    "eslint-plugin-regexp",
    "@stylistic/eslint-plugin",
    "eslint-plugin-perfectionist",
    "eslint-plugin-complete",
    "eslint-plugin-isaacscript",
    { "name": "eslint-unicorn", "specifier": "eslint-plugin-unicorn" },
    { "name": "eslint-node", "specifier": "eslint-plugin-node" },
  ]

export default defineConfig({
    plugins: ["typescript", "unicorn", "import", "node", "jsdoc"],
    options: { typeAware: true , typeCheck: true },
    categories: {
      correctness: "error",
    },
    jsPlugins: jsPlugins,
    env: {
      builtin: true,
    },
    ignorePatterns: [
      "*.json",
      "*.jsonc",
      "*.mjs",
      "*.js",
      "node_modules",
      "mod",
      "dist",
    ],
    rules: {
      "isaacscript/enum-member-number-separation": "error",
      "isaacscript/require-v-registration": "error",
      "typescript/no-for-in-array": "error",
      "typescript/restrict-plus-operands": "error",
      "typescript/no-dynamic-delete": "warn",
      "typescript/prefer-optional-chain": "error",
      "eqeqeq": ["error", "always"],
      "typescript/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "typescript/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "typescript/no-explicit-any": "warn",
      "typescript/no-non-null-assertion": "warn",
      /**
       * It is conventional in IsaacScript mods to put the "v" object outside the class, which
       * makes it likely that some methods will not use any internal class variables.
       */
      "typescript/class-methods-use-this": "off",

      /**
       * TSTL has special behavior with respect to `this: void`, so we need to configure this rule
       * to allow the `this` parameter.
       */
      "typescript/no-invalid-void-type": [
        "error",
        { allowAsThisParameter: true },
      ],

      /**
       * This rule throws false positives with Isaac API functions. It can be worked around by
       * supplying lists of globals to ESLint, but this is ugly. See:
       * https://github.com/typescript-eslint/typescript-eslint/issues/2780
       */
      "typescript/no-loop-func": "off",

      /**
       * Enums that are used with the API must be numbers since that is what the API expects. We
       * also prefer that unofficial enums are also number enums for consistency.
       */
      "typescript/prefer-enum-initializers": "off",

      /** It is common to initialize enums with the `Isaac.GetEntityVariantByName` method. */
      "typescript/prefer-literal-enum-member": "off",

      /** IsaacScript mods to not use ESM, so we must turn this rule off. */
      "eslint-node/file-extension-in-import": "off",

      /**
       * Isaac API methods use capital letters, so we must make the options for the rule less
       * strict.
       */
      "new-cap": [
        "error",
        {
          capIsNew: false,
          newIsCap: true,
          properties: true,
        },
      ],

      /** Isaac enums use bitwise operators (e.g. "EntityFlag"). */
      "no-bitwise": "off",

      /** The Isaac API callback functions expect you to modify the provided object. */
      "no-param-reassign": "off",

      /** "print" is used with Lua mods. */
      "no-restricted-globals": "off",

      /** Is it common for set ordering to have semantic meaning in Isaac mods. */
      "perfectionist/sort-arrays": "off",

      /* * It is idiomatic in Isaac mods to use "SubType" instead of "Subtype". */
      "eslint-unicorn/consistent-compound-words": "off",

      /** The rule assumes that `print` is the JavaScript one instead of the Lua one. */
      "eslint-unicorn/no-invalid-argument-count": [
        "error",
        {
          print: {
            min: 0,
          },
        },
      ],

      /**
       * `null` values are conventionally used with the `isaacscript-common` save data manager (even
       * though they are transpiled to `nil`).
       */
      "unicorn/no-null": "off",

      /** `Iterator#toArray()` is not supported by TypeScriptToLua. */
      "eslint-unicorn/prefer-iterator-to-array": "off",

      /** IsaacScript mods use Lua bitwise operators, which are safe. */
      "unicorn/prefer-math-trunc": "off",

      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/keyword-spacing": "error",
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false },
        },
      ],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-infix-ops": "error",
      "@stylistic/type-annotation-spacing": "error",

      // --- Perfectionist ---
      "perfectionist/sort-enums": ["error", { type: "natural", order: "asc" }],
      "perfectionist/sort-exports": ["error", { type: "natural", order: "asc" }],
      "perfectionist/sort-interfaces": ["error", { type: "natural", order: "asc" }],
      "perfectionist/sort-named-exports": ["error", { type: "natural", order: "asc" }],
      "perfectionist/sort-named-imports": ["error", { type: "natural", order: "asc" }],
      "perfectionist/sort-object-types": ["error", { type: "natural", order: "asc" }],

      // --- Regexp ---
      "regexp/no-unused-capturing-group": "error",
      "regexp/no-useless-escape": "error",
      "regexp/no-useless-lazy": "error",
      "regexp/optimal-quantifier-concatenation": "error",
      "regexp/prefer-character-class": "error",
      "regexp/prefer-range": "error",
      "regexp/prefer-regexp-test": "error",
    },
  },
  )
