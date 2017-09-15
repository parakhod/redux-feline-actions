const getReducerName = s => s.replace( /([a-z])([A-Z0-9])/g, '$1_$2').toUpperCase();

const createActions = actions => {
  return Object.keys(actions).reduce((p,name) => ({
    ...p,
    [name]: (...params) => {
      const action = actions[name];

      const payloadData = 
        typeof action === 'function' ? action(...params) : 
        typeof action === 'string' || action ===  true ? params[0] :
        action;

      const reducerName = getReducerName(typeof action === 'string' ? action : (payloadData.useReducer || name));

      let payload = {};
      let meta = {};

      if (payloadData) {
        payload = {
          payload: payloadData
        }

        if (payloadData.meta ) {
          meta = {
            meta: typeof payloadData.meta === 'object' ? 
              payloadData.meta :
              {
                value: payloadData.meta
              }
          }
        }
      }

      return {
        type: reducerName,
        ...payload,
        ...meta
      }
    }
  }), {});
}

export {
  getReducerName,
  createActions
}

export default {
  getReducerName,
  createActions
}

