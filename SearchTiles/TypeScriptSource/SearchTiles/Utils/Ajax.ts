module SearchTiles.Utils {

    export function AjaxDataGetter(url: string, callback: Function): any {
        var xhrObject = new XMLHttpRequest();
        xhrObject.onreadystatechange = (response) => {
            if (xhrObject.readyState === 4) {
                callback(JSON.parse(xhrObject.responseText));
            }
        };
        xhrObject.open(
            "GET",
            url,
            true
        );
        xhrObject.send();
    }

}