// This represents an app assets response
// Assets could be filtered down based on formats/types or we could have an endpoint specifically for fonts

export const fonts = [
    {
        name: "FiraMono", // We need to be able to name font assets. This will become the font family name.
        format: "woff",
        src: "https://cdn.rawgit.com/mozilla/Fira/5c8d9b6b/woff/FiraMono-Regular.woff"
    },
    {
        name: "FiraSans Regular",
        format: "woff",
        src: "https://cdn.rawgit.com/mozilla/Fira/5c8d9b6b/woff/FiraSans-Regular.woff"
    }
]