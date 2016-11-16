if (Meteor.isClient) {

  Template.select.onCreated(function() {
    this.selectedValue = new ReactiveVar();
  });

  Template.select.helpers({
    options: function() {
      var anySelected = false;

      var options = [
        {
          name: 'First Option',
          value: '1'
        },
        {
          name: 'Second Option',
          value: '2'
        },
        {
          name: 'Third Option',
          value: '3'
        }
      ];

      options = _.map(options, function(option) {
        if (option.value === Template.instance().selectedValue.get()) {
          option.selected = true;
          anySelected = true;
        }
        return option;
      });

      if (!anySelected) {
        // If no option is selected, we display a placeholder and select it by default
        options.unshift({
          name: 'Select an option...',
          value: '',
          selected: true,
          disabled: true
        });
      }

      return options;
    }
  });

  Template.select.events({
    'change select': function(e, template) {
      var selectedValue = $(e.target).val();
      template.selectedValue.set(selectedValue);
    }
  });

}
