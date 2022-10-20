export default {
  methods: {
    switchActiveButton() {
      this.active = !this.active
      if (this.active) {
        if (GV.config.activeControl) {
          GV.config.activeControl.deactivate()
        }
        GV.config.activeControl = this.control
        if (GV.config.activeButton && this.name !== GV.config.activeButton.name) {
          GV.config.activeButton.active = false
        }
        GV.config.activeButton = this
        GV.config.activeButton.active = true
        this.control.activate()
      } else {
        this.control.deactivate()
      }
    },
  },
  mounted: function () {
    if (this.options && this.options.active) {
      this.switchActiveButton()
    }
  },
}
