// Helper functions from http://cosinekitty.com/solar_system.html
var BriefDayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function BriefTimeString (date)
    {
        if (date == null) {
            return "";
        } else {
            var h = date.getHours();
            h = ((h < 10) ? "0" : "") + h.toString();
            var m = date.getMinutes();
            m = ((m < 10) ? "0" : "") + m.toString();
            var s = date.getSeconds();
            s = ((s < 10) ? "0" : "") + s.toString();
            return BriefDayOfWeek[date.getDay()] + " " + h + ":" + m + ":" + s;
        }
    }


function BriefDayValueString (day)
    {
        if (day == null) {
            return "";
        } else {
            return BriefTimeString (Astronomy.DayValueToDate (day));
        }
    }

Module.register("planetrise", {
    defaults: {
        latitude: 34.2,
        longitude: -118.1,
        //bodies: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn']
	//FA does not have jupiter and saturn unfortunately, so be creative
        bodies: {'Sun': 'sun-o',
                'Moon': 'moon-o',
            'Mercury': 'mercury',
            'Venus': 'venus',
            'Mars': 'mars',
            'Jupiter': 'circle-thin',
            'Saturn': 'dot-circle-o',
        }
    },
    // Define start sequence.
        start: function() {
                Log.info("Starting module: " + this.name);

                // Schedule update interval.
                var self = this;
                setInterval(function() {
                        self.updateDom();
                }, 1000*60);
    },
    // Override dom generator.
    getDom: function() {
        latitude = this.config.latitude;
        longitude = this.config.longitude;

        var wrapper = document.createElement("table");
        wrapper.className = "small";

        var AstroDateTime = new Date();
        var day = Astronomy.DayValue (AstroDateTime);
        var location = new GeographicCoordinates(longitude, latitude, 0);

        for (var i in Astronomy.Body) {
            //AddRowForCelestialBody (Astronomy.Body[i], day);
            if (Object.keys(this.config.bodies).indexOf(Astronomy.Body[i].Name) >= 0){
                var planetWrapper = document.createElement("tr");
                planetWrapper.className = "normal";
                var symbolWrapper = document.createElement("td");
                symbolWrapper.className = "symbol";
                var symbol =  document.createElement("span");
                symbol.className = "fa fa-" + this.config.bodies[Astronomy.Body[i].Name];
                symbolWrapper.appendChild(symbol);
                planetWrapper.appendChild(symbolWrapper);
                var titleWrapper = document.createElement("td");
                titleWrapper.innerHTML = Astronomy.Body[i].Name;
                titleWrapper.className = "title bright";
                planetWrapper.appendChild(titleWrapper);
                var riseWrapper = document.createElement("td");
                riseWrapper.className = "time light";
                riseWrapper.innerHTML = BriefDayValueString(Astronomy.NextRiseTime(Astronomy.Body[i], day, location));
                planetWrapper.appendChild(riseWrapper);
                var setWrapper = document.createElement("td");
                setWrapper.className = "time light";
                setWrapper.innerHTML = BriefDayValueString(Astronomy.NextSetTime(Astronomy.Body[i], day, location));
                planetWrapper.appendChild(setWrapper);
                //planetWrapper.innerHTML = Object.keys(Astronomy.Body[i]).toString();
                wrapper.appendChild(planetWrapper);
            }
        }
        //wrapper.innerHTML = make_text(sun_elevation, next, julian_date);
        return wrapper;
    },
    getScripts: function() {
        return['astronomy.js']
    }
});
