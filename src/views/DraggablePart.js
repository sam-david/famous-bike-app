define(function(require, exports, module) {
    var View = famous.core.View;
    var Modifier = famous.core.Modifier;
    var StateModifier = famous.modifiers.StateModifier;
    var Transform = famous.core.Transform;
    var Transitionable = famous.transitions.Transitionable;
    var ImageSurface = famous.surfaces.ImageSurface;
    var Surface = famous.core.Surface;

    function DraggablePart() {
        View.apply(this, arguments);

        View.call(this)

        var position = new Transitionable();

        sync.on('end',function(){
            console.log('snapping');
        });
    }

    DraggablePart.prototype = Object.create(View.prototype);
    DraggablePart.prototype.constructor = DraggablePart;

    DraggablePart.DEFAULT_OPTIONS = {};

    module.exports = DraggablePart;
});
