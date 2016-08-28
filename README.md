# Module planetrise
Calculates and display the rise and set times of the planets for Magic Mirror 2

This module is powered with Don Cross's javascript library [astronomy.js](http://cosinekitty.com).
## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'planetrise',
		position: 'top_right',	// This can be any of the regions.
		header: 'PLanet Rise',
        config: {  // Place the latitude and longitude of your mirror
            latitude: 45.5,
            longitude: -122.38,
            // A dictiory of the bodies and unicode character for the symbol
            // This is the default and does not need to be listed.
            // A full list of bodies can be seen on line 1359 in astronomy.js
            // Note: Trying to find the rise time of Earth will crash the Module
            bodies: {'Sun': '☉',
                    'Moon': '☽',
                    'Mercury': '☿',
                    'Venus': '♀',
                    'Mars': '♂',
                    'Jupiter': '♃',
                    'Saturn': '♄',
            }
        }
	}
]
````
