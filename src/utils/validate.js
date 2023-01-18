export default function validate(state, error, target, dogs) {
  const errors = { ...error };

  if (target === 'name') {
    if (!state.name) {
      errors.name = 'Name is required';
    } else if (!/^[A-Ú]/.test(state.name)) {
      errors.name = 'Name must start with a capital letter';
    } else if (!/^[A-Ú]+[a-úA-Ú]/.test(state.name)) {
      errors.name = 'Name must contain at least two letters';
    } else if (!/^[A-Ú]+[a-úA-Ú.']+([ ][a-úA-Ú]+)*$/.test(state.name)) {
      errors.name = 'Only words separated by a blank space. No trailing whitespace.';
    } else if (dogs.filter(dog => dog.name.trim().toLowerCase() === state.name.trim().toLowerCase()).length) {
      errors.name = 'The name already exists.';
    } else if (state.name.length > 35) {
      errors.name = 'Length must not exceed 35 characters.';
    } else {
      errors.name = '';
    }
  }

  if (target === 'weight_min' || target === 'weight_max') {
    errors.weight_max = '';
    errors.weight_min = '';

    if (!state.weight_min) {
      errors.weight_min = 'The minimum weight is mandatory.';
    }

    if(!/^(0|[1-9][0-9]*)$/.test(state.weight_min)) {
      errors.weight_min = 'The minimum weight accepts only integer values with no leading zeros.';
    }

    if (state.weight_min && Math.ceil(state.weight_min) < 0) {
      errors.weight_min = 'The minimum weight must be greater than or equal to zero.';
    }

    if (state.weight_min && Math.ceil(state.weight_min) >= 100) {
      errors.weight_min = 'The minimum weight must be less than 100.';
    }

    if (!state.weight_max) {
      errors.weight_max = 'The maximum weight is mandatory.';
    }

    if(!/^(0|[1-9][0-9]*)$/.test(state.weight_max)) {
      errors.weight_max = 'The maximum weight accepts only integer values with no leading zeros.';
    }

    if (state.weight_max && Math.ceil(state.weight_max) > 100) {
      errors.weight_max = 'The maximum weight must be less than or equal to 100.';
    }

    if (state.weight_max && Math.ceil(state.weight_max) < 0) {
      errors.weight_max = 'The maximum weight must be greater than or equal to zero.';
    }

    if (state.weight_min &&
      state.weight_max &&
      Math.ceil(state.weight_max) < Math.ceil(state.weight_min)
    ) {
      errors.weight_max = 'The maximum weight must be greater than or equal to the minimum weight.';
      errors.weight_min = 'The minimum weight must be less than or equal to the maximum weight.';
    }
  }

  if (target === 'height_min' || target === 'height_max') {
    errors.height_max = '';
    errors.height_min = '';

    if (!state.height_min) {
      errors.height_min = 'The minimum height is mandatory.';
    }

    if(!/^(0|[1-9][0-9]*)$/.test(state.height_min)) {
      errors.height_min = 'The minimum height accepts only integer values with no leading zeros.';
    }

    if (state.height_min && Math.ceil(state.height_min) < 0) {
      errors.height_min = 'The minimum height must be greater than or equal to zero.';
    }

    if (state.height_min && Math.ceil(state.height_min) >= 100) {
      errors.height_min = 'The minimum height must be less than 100.';
    }

    if (!state.height_max) {
      errors.height_max = 'The maximum height is mandatory.';
    }

    if(!/^(0|[1-9][0-9]*)$/.test(state.height_max)) {
      errors.height_max = 'The maximum height accepts only integer values with no leading zeros.';
    }

    if (state.height_max && Math.ceil(state.height_max) < 0) {
      errors.height_max = 'The maximum height must be greater than or equal to zero.';
    }

    if (state.height_max && Math.ceil(state.height_max) > 100) {
      errors.height_max = 'The maximum height must be less than or equal to 100.';
    }

    if (state.height_min &&
      state.height_max &&
      Math.ceil(state.height_max) < Math.ceil(state.height_min)
    ) {
      errors.height_max = 'The maximum height must be greater than or equal to the minimum height.';
      errors.height_min = 'The minimum height must be less than or equal to the maximum height.';
    }
  }

  if (target === 'life_span_min' || target === 'life_span_max') {
    errors.life_span_max = '';
    errors.life_span_min = '';

    if (!state.life_span_min) {
      errors.life_span_min = 'The minimum life span is mandatory.';
    }

    if(!/^(0|[1-9][0-9]*)$/.test(state.life_span_min)) {
      errors.life_span_min = 'The minimum life span accepts only integer values with no leading zeros.';
    }

    if (state.life_span_min && Math.ceil(state.life_span_min) <= 0) {
      errors.life_span_min = 'The minimum life span must be greater than or equal to 1.';
    }

    if (state.life_span_min && Math.ceil(state.life_span_min) > 20) {
      errors.life_span_min = 'The minimum life span must be less than or equal to 20.';
    }

    if (!state.life_span_max) {
      errors.life_span_max = 'The maximum life span is mandatory.';
    }

    if(!/^(0|[1-9][0-9]*)$/.test(state.life_span_max)) {
      errors.life_span_max = 'The maximum life span accepts only integer values with no leading zeros.';
    }

    if (state.life_span_max && Math.ceil(state.life_span_max) <= 0) {
      errors.life_span_max = 'Life Span Max must be greater than or equal to 1.';
    }

    if (state.life_span_max && Math.ceil(state.life_span_max) > 20) {
      errors.life_span_max = 'Life Span Max must be less than or equal to 20.';
    }

    if (state.life_span_min &&
      state.life_span_max &&
      Math.ceil(state.life_span_max) < Math.ceil(state.life_span_min)
    ) {
      errors.life_span_max = 'Life Span Max must be greater than Life Span Min.';
      errors.life_span_min = 'Life Span Min must be less than Life Span Max.';
    }
  }

  if (target === 'temperaments') {
    if (Math.ceil(state.temperaments.length) === 0) {
    // if (state.temperaments && Math.ceil(state.temperaments.length) === 0) {
      errors.temperaments = 'Must choose at least one temperament.';
    } else {
      errors.temperaments = '';
    }
  }

  let countPending = 0;
  let countOk = 0;
  for (var value of Object.values(errors))
  {
    if(value === 'pending') {
      countPending++
    }
    if(value === '') {
      countOk++;
    }
  }

  if (countPending > 0 || countOk+1 !== Object.keys(errors).length) {
    errors.complete = false;
  } else {
    errors.complete = true;
  }

  return errors;
}
