# LittleLib
Little library (HTML, CSS e JS)

## Menu

This is layout of Json to mount the menu.

You need `label`, `href` and `n` if has child, if no child don't put index `n` like this `{ "label": "item 2", "href": "#" }`
If `href` is not link or route put only `"href": "#"` or `"href": ""`

```json
[
    { 
        "label": "item 1", 
        "href": " ",
        "n": [
            {
                "label":"subitem 1", 
                "href": "#",
                "n": [{
                    "label":"Google",
                    "href": "http://www.google.com.br"
                }]
            },{
                "label":"subitem 2", 
                "href": "#",
                "n": [{
                    "label":"sub-subitem 2.1",
                    "href": "#"
                },
                {
                    "label":"sub-subitem 2.2",
                    "href": "#"
                }]
            }
        ]
    },
    { "label": "item 2", "href": "#" },
    { "label": "item 3", "href": "#" }
]
```
