import { useEffect, useMemo, useState } from "react";
import { deleteReportImage, uploadReportImages } from "../services/reports";

export default function ReportImages({ reportId, images = [], onImagesChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [error, setError] = useState("");

  const previews = useMemo(() => {
    return selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
  }, [selectedFiles]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setError("");
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!reportId || !selectedFiles.length) return;

    try {
      setIsUploading(true);
      setError("");
      const nextImages = await uploadReportImages(reportId, selectedFiles);
      onImagesChange(nextImages);
      setSelectedFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudieron subir las imagenes.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!reportId) return;

    try {
      setDeletingImageId(imageId);
      setError("");
      const nextImages = await deleteReportImage(reportId, imageId);
      onImagesChange(nextImages);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar la imagen.");
    } finally {
      setDeletingImageId(null);
    }
  };

  const totalAfterUpload = images.length + selectedFiles.length;

  return (
    <section className="col-span-2 mt-4 rounded-lg border border-[#dce0e5] bg-[#fcfcfb] p-5">
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Imagenes</h2>
          <p className="text-sm text-gray-500">
            Hasta 6 por subida y 5 MB por archivo.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {images.length} guardadas{selectedFiles.length ? ` + ${selectedFiles.length} pendientes` : ""}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-lg border border-dashed border-[#cdbfdb] bg-white p-4">
        <label className="block text-sm font-medium text-[#333333]" htmlFor="report-images-input">
          Seleccionar imagenes
        </label>
        <input
          id="report-images-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full rounded border border-[#dce0e5] p-2"
        />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            {selectedFiles.length
              ? `${selectedFiles.length} archivo(s) listo(s) para subir. Total visible: ${totalAfterUpload}.`
              : "Todavia no seleccionaste imagenes nuevas."}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedFiles([]);
                setError("");
              }}
              disabled={!selectedFiles.length || isUploading}
              className="delete-button rounded-lg border border-[#99144d] px-4 py-2 font-semibold text-[#99144d] transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFiles.length || isUploading}
              className="link-button rounded-lg bg-[#632b91] px-4 py-2 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? "Subiendo..." : "Subir imagenes"}
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-3 rounded border border-[#f1c2cf] bg-[#fff6f8] px-3 py-2 text-sm text-[#99144d]">
          {error}
        </p>
      ) : null}

      {selectedFiles.length ? (
        <div className="mt-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Pendientes de subida
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {previews.map((preview) => (
              <article key={preview.url} className="overflow-hidden rounded-lg border border-[#ebe6f1] bg-white">
                <img src={preview.url} alt={preview.name} className="h-40 w-full object-cover" />
                <div className="border-t border-[#ebe6f1] px-3 py-2">
                  <p className="truncate text-sm text-gray-600">{preview.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Imagenes guardadas
        </h3>
        {images.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((image) => (
              <article key={image._id} className="overflow-hidden rounded-lg border border-[#ebe6f1] bg-white">
                <a href={image.secureUrl} target="_blank" rel="noreferrer">
                  <img src={image.secureUrl} alt="Imagen del informe" className="h-40 w-full object-cover" />
                </a>
                <div className="flex items-center justify-between gap-3 border-t border-[#ebe6f1] px-3 py-2">
                  <a
                    href={image.secureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[#632b91] underline-offset-2 hover:underline"
                  >
                    Abrir
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(image._id)}
                    disabled={deletingImageId === image._id || isUploading}
                    className="delete-button rounded-lg border border-[#99144d] px-3 py-1.5 text-sm font-semibold text-[#99144d] transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingImageId === image._id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#dce0e5] bg-white px-4 py-8 text-center text-sm text-gray-500">
            Este informe todavia no tiene imagenes.
          </div>
        )}
      </div>
    </section>
  );
}
