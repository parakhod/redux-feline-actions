const getReducerName = s => s.replace( /([a-z])([A-Z0-9])/g, '$1_$2').toUpperCase();

const createActions = actions => 
  typeof actions !== 'object' ? 
    new Error( `Cannot create actions from ${typeof actions}, should be an object`) :
  Object.keys(actions).reduce((p,name) => ({
    ...p,
    [name]: (...params) => {
      const action = actions[name];

      const payloadData = 
        typeof action === 'function' ? action(...params) : 
        action;

      const reducerName = getReducerName(payloadData.useReducer || name);

      let payload = {};
      let meta = {};

      if (payloadData) {
        payload = {
          payload: payloadData.payload || payloadData
        }

        if ( payloadData.meta ) {
          meta = {
            meta: 
              typeof payloadData.meta === 'object' ? payloadData.meta :
              typeof payloadData.meta === 'string' ? {
                [payloadData.meta]: true
              } : {
                value: payloadData.meta
              }
          }
          delete payload.payload.meta;
        }
      }

      return {
        type: reducerName,
        ...payload,
        ...meta
      }
    }
  }), {});



export {
  getReducerName,
  createActions
}

export default {
  getReducerName,
  createActions
}

