var exp_data = "//Simple-Blink\
\
var blink_max = effect(\"Simple-Blink\")(\"Max\");\
var blink_min = effect(\"Simple-Blink\")(\"Min\");\
var random_max = effect(\"Simple-Blink\")(\"RandomMax\");\
var tolerance = effect(\"Simple-Blink\")(\"Tolerance\");\
var rnd_seed = effect(\"Simple-Blink\")(\"Seed\");\
\
seedRandom(rnd_seed)\
\
var rnd = random(0,random_max)\
\
if (rnd < tolerance){\
	[blink_max]\
}else{\
	[blink_min]\
}";

var activeItem = app.project.activeItem;
var selectProperty = activeItem.selectedLayers[0].selectedProperties[0]

var filepath = new File(new File($.fileName).parent);
var ffxpath = filepath.fullName + "/simple-blink.ffx";

if(activeItem && selectProperty != undefined){
    if(selectProperty.canSetExpression){
        selectProperty.expression = exp_data;
        activeItem.selectedLayers[0].applyPreset(File(ffxpath));
    }else{
        alert("Expression cannot be applied to this property.");
    }
}else{
    alert("The active item or property is not selected.");
}