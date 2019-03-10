const validationState = {
    methods: {
      state(dirty, _state) {
        if (dirty && _state === true) {
          return false
        }
        return null
      },
    },
};

export default validationState;
