module SearchTiles.Utils.AppStart {

    export function RegisterDomReadyFunction(readyCallback) {
        document.addEventListener("DOMContentLoaded", readyCallback, false);
    }

}
