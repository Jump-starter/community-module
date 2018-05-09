module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
    },
    "rules": {
        "no-shadow": 0,
        "react/prop-types": 0,
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "max-len": [2, 80, 4, {"ignoreUrls": true}, {"ignoreComments": true}]
    }
};
