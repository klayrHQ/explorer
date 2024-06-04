module.exports = {
    "ignorePatterns": ["**/*.stories.tsx"],
    extends: ["eslint:recommended", "next", "turbo", "prettier"],
    rules: {
        "@next/next/no-html-link-for-pages": "off",
        "@next/next/no-img-element": "off",
        "comma-dangle": [
            2, {
                "arrays": "always-multiline",
                "objects": "always",
                "imports": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline",
            },
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "no-unused-vars": "off",
        "import/no-mutable-exports": 2,
        "import/no-named-as-default": 2,
        "import/no-unused-modules": 2,
        "import/no-absolute-path": 2,
        "import/no-unresolved": 2,
        "import/first": 2,
        "import/no-useless-path-segments": 2,
        "react/jsx-key": 2,
        "react/jsx-no-literals": 1,
        "react/boolean-prop-naming": 1,
        "react/jsx-curly-newline": 2,
        "react/jsx-curly-spacing": 2,
        "react/prop-types": 2,
        "react/no-unused-state": 2,
        "react/no-unused-prop-types": 2,
        "react/no-multi-comp": 2,
        "react/no-children-prop": 2,
        "react/no-array-index-key": 2,
        "react/jsx-wrap-multilines": 2,
        "react/jsx-closing-bracket-location": 2,
        "react/jsx-closing-tag-location": 2,
        "react/jsx-equals-spacing": 2,
        "react/jsx-boolean-value": 2,
        "react/jsx-tag-spacing": 0,
        "react/jsx-indent-props": [2, 2],
        "react/jsx-pascal-case": 2,
        "react/jsx-sort-props": [
            2,
            {
                callbacksLast: false,
                shorthandFirst: false,
                shorthandLast: false,
                multiline: "ignore",
                ignoreCase: true,
                noSortAlphabetically: false,
                reservedFirst: false,
                locale: "auto",
            },
        ],
        "react/jsx-no-bind": [
            2,
            {
                ignoreDOMComponents: true,
                ignoreRefs: true,
                allowArrowFunctions: true,
                allowFunctions: false,
                allowBind: false,
            },
        ],
    },
};
