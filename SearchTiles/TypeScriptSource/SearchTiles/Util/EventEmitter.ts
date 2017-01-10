module SearchTiles.Util {

    // Based on Jerome Etienne's "MicroEvent" package
    // https://github.com/jeromeetienne/microevent.js
    // Why? 15 lines of code and it's well tested.

    var registeredEvents = {};
    export var EventEmitter = {
        on(eventName:string, handler:Function) {
            registeredEvents[eventName] = registeredEvents[eventName] || [];
            registeredEvents[eventName].push(handler);
        },
        off(eventName:string, handler:Function) {
            if (eventName in registeredEvents === false) return;
            registeredEvents[eventName].splice(registeredEvents[eventName].indexOf(handler), 1);
        },
        trigger(eventName:string, eventPayload:any) {
            if (eventName in registeredEvents === false) return;
            for (var i = 0; i < registeredEvents[eventName].length; i++) {
                registeredEvents[eventName][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    }
}
