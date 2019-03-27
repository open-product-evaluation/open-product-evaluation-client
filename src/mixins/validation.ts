const validationState = {
    methods: {
      state(dirty, state) {
        if (dirty && state === true) {
          return false;
        }
        return null;
      },
    },
};

export default validationState;
