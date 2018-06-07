export const types = {
    PROCESSING_FIRST_UPLOAD: "PROCESSING_FIRST_UPLOAD",
    PROCESSED_FIRST_UPLOAD: "PROCESSED_FIRST_UPLOAD",
    PROCESS_FIRST_UPLOAD_ERROR: "PROCESS_FIRST_UPLOAD_ERROR"
}

export const processing_first_upload = (obj => ({type: types.PROCESSING_FIRST_UPLOAD, payload: obj}));
export const processed_first_upload = (obj => ({type: types.PROCESSED_FIRST_UPLOAD, payload: obj}));
export const process_first_upload_error = (obj => ({type: types.PROCESS_FIRST_UPLOAD_ERROR, payload: obj}));