export function successResponse(res, data, message = 'Success', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function errorResponse(res, message = 'Error', status = 500, errors = null) {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(status).json(payload);
}
