WAF.define('WakendoProgressBar', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
	
    var KendoProgressBar = widget.create('WakendoProgressBar', {
    	
    	value: widget.property({
    		type: 'number'
    	}),
    	
    	displayType: widget.property({
    		type: 'enum',
    		values: ['percent', 'value'],
    		defaultValue: 'value'
    	}),
    	
    	min: widget.property({
    		type: 'number',
    		defaultValue: 0
    	}),
    	
    	max: widget.property({
    		type: 'number',
    		defaultValue: 100
    	}),    	
    	
        init: function() {
        	var self = this;

        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		self.kendoWidget.value(newValue);
        	});
        	
        	self.render();
        },
        
        render: function() {
        	var self = this;
        	$(self.node).empty();
			
			var $el = $(self.node);
    		$el.kendoProgressBar({
    			type: self.displayType(),
    			min: self.min(),
    			max: self.max(),
        		change: function(event) {
        			self.valueChangeSubscriber.pause();
        			self.value(event.value);
        			self.valueChangeSubscriber.resume();
        		},
        		complete: function() {
        			self.fire('complete');
        		}
        	});
			self.kendoWidget = $el.data("kendoProgressBar");
        },
        
        status: function(text) {
        	this.kendoWidget.progressStatus.text(text);
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }

    });

    return KendoProgressBar;

});
