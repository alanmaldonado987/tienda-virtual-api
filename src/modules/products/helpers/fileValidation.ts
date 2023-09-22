export const FileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  console.log({ file });

  if (!file) return callback(new Error('El archivo no se encontró'), false);

  const fileType = file.originalname.split('.')[1];

  console.log(fileType, ': filetype');

  const validExtensionFile = ['jpg', 'png', 'jpeg'];

  if (validExtensionFile.includes(fileType)) {
    return callback(null, true);
  }
  callback(null, false);
};
