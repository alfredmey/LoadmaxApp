// If you want to prevent dragging, uncomment this section
function preventBehavior(e)
{
    e.preventDefault();
};

//document.addEventListener("touchmove", preventBehavior, false);

function onBodyLoad()
{
    document.addEventListener("deviceready",onDeviceReady,false);

}

/* When this function is called, PhoneGap has been initialized and is ready to roll */
function onDeviceReady()
{

}
