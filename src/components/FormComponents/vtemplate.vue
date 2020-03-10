

<script>
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  props: ["jsonData"],
  computed: {
    cDefaultValue() {
      if (
        this.jsonData.defaultValue == "now" &&
        this.jsonData.type == "jvDatePicker"
      ) {
        let d = new Date();
        let mon = "00" + (d.getMonth() + 1);
        let monLen = d.getMonth().toString().length;
        let date = "00" + d.getDate();
        let dateLen = d.getDate().toString().length;
        return `${d.getFullYear()}-${mon.slice(
          mon.length -2,
          mon.length
        )}-${date.slice(date.length - 2, date.length)}`;
      }
      if (
        this.jsonData.defaultValue == "now" &&
        this.jsonData.type == "jvTimePicker"
      ) {
        let d = new Date();
        return d.toString().slice(16, 21);
      }
      return this.jsonData.defaultValue;
    }
  },
  mounted() {
    this.inputValue = this.cDefaultValue;
  },
  methods: {
    resetData() {
      this.inputValue =
        this.jsonData.defaultValue === undefined
          ? this.localDefaulValue === undefined
            ? ""
            : this.localDefaulValue
          : this.cDefaultValue;
    }
  },
  watch: {
    inputValue: function() {
      this.$emit(
        "setResData",
        this.jsonData.varName === undefined
          ? this.jsonData.name
          : this.jsonData.varName,
        this.inputValue
      );
    }
  }
};
</script>