function hexToRGB(theHex){
  theHex = parseInt(theHex,16);

  var r = theHex >> 16;
  var g = (theHex & 0x00ff00) >> 8;
  var b = theHex & 0xff;
 
  return [r/255,g/255,b/255];
};

function buildUI(thisObj){
    var main_wnd;

    if(thisObj instanceof Panel){
        main_wnd = thisObj ;
    }else{
        main_wnd = new Window("palette", "PaintEffect-Color-Changer", undefined, {resizeable : false});
    }

    main_wnd.preferredSize = [120,80]

    var input_text = main_wnd.add("edittext", undefined, "",{multiline : false});
    input_text.alignment = ["fill","fill"];

    var ok_btn = main_wnd.add("button", undefined, "OK");
    ok_btn.alignment = ["fill","bottom"];

    main_wnd.layout.layout();

    ok_btn.onClick = function(){

        var text_data = input_text.text.replace(/\r?\n/g, '')
        var activeItem = app.project.activeItem;
        var activeItemLayer = activeItem.selectedLayers[0]
        
        if (check_is.value == true) text_data = text_data.replace(/\s+/g, "");

        if(activeItem){
            if(activeItemLayer.selectedProperties[0].name == "ペイント" || activeItemLayer.selectedProperties[0].name == "Paint"){
                for (var i = 1; i <= Number(activeItemLayer.selectedProperties.length)-1; i++) activeItemLayer.selectedProperties[i].strokeOption.color.setValue(hexToRGB(input_text.text));
            }else{
                alert("Paint effect not selected.");
            }
        }else{
            alert("The active item is not selected.");
        }
    }

    main_wnd.onResize = function(){
        main_wnd.layout.resize();
    }

    return main_wnd;
}

var toolspanel = buildUI (this);

if(!(toolspanel instanceof Panel)){
    toolspanel.center();
    toolspanel.show();
}