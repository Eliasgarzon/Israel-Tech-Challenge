import { Alert, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  justifyContent: "center",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function UploadImage({
  user,
  setThumbnail,
  setThumbnailError,
  thumbnailError,
  showPreview,
  thumbnail,
}) {
  const [files, setFiles] = useState([]);
  const validator = (file) => {
    setThumbnailError(null);
    if (file.type.split("/")[0] !== "image") {
      setThumbnailError("File must be an image");
      return;
    }
    if (file.size > 1000000) {
      setThumbnailError("File must be less than 1mb");
      return;
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    validator: validator,
    accept: "image/*",
    maxSize: 1000000,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            photoURL: URL.createObjectURL(file),
          })
        )
      );
      setThumbnail(acceptedFiles[0]);
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.photoURL} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      {!showPreview && (
        <Avatar alt={user.displayName} src={user.photoURL} sx={{ my: 5 }} />
      )}
      {showPreview && (
        <Box sx={{ mt: 1 }}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Please Upload a profile picture. Click here or drag and drop.</p>
          </div>
          <div style={thumbsContainer}>{thumbs}</div>
          {thumbnailError && <Alert severity="error">{thumbnailError}</Alert>}
        </Box>
      )}
    </>
  );
}
