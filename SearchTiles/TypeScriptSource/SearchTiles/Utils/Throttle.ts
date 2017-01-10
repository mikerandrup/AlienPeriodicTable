module SearchTiles.Utils {

    // I decided to drop this in, and lose the `lodash` dep
    // Thank you to Remy Sharp https://remysharp.com/2010/07/21/throttling-function-calls

    export function Throttle(functionToThrottle: Function, threshholdMilliseconds: number, theThisContext: any) {
        threshholdMilliseconds || (threshholdMilliseconds = 250);
        var last,
            deferTimer;
        return function () {
            var context = theThisContext || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshholdMilliseconds) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    functionToThrottle.apply(context, args);
                }, threshholdMilliseconds);
            } else {
                last = now;
                functionToThrottle.apply(context, args);
            }
        };
    }
}
