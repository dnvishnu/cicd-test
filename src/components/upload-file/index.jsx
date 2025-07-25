import { DocumentChartBarIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "@/context/AppContext";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { authorized, loader } = useContext(AppContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/json") {
      setFile(droppedFile);
      setMessage("");
    } else {
      toast.error("Only JSON files are allowed.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      setLoading(true);
      try {
        const jsonData = JSON.parse(event.target.result);
        const formattedDate = jsonData.date.split("-").reverse().join("-");
        const payload = { date: formattedDate, matchData: jsonData };

        const response = await axios.post(
          "https://kreate-backend-436124264408.us-central1.run.app/cricket/upload-match",
          payload
        );


        if (response.status === 200) {

          // Fetch match scorecard data
          const scorecardResponse = await axios.get(
            `https://api.cricapi.com/v1/match_scorecard?apikey=5c46d205-1560-4705-805d-c5f04c63e4c6&offset=0&id=${jsonData.id}`
          );

          const scorecardData = scorecardResponse.data?.data || jsonData;

          if (scorecardResponse.status === 200) {
            const summaryPayload = {
              date: formattedDate,
              seriesId: jsonData.series_id,
              matchId: jsonData.id,
              data: JSON.stringify(scorecardData),
            };
            await axios.post(
              "https://kreate-backend-436124264408.us-central1.run.app/cricket/generate-summary",
              summaryPayload
            );

            toast.success("Match has been updated");
          }
        } else {
          toast.error("Failed to upload match data.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => setMessage("Error reading the file.");
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center lg:justify-start min-h-screen px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-2xl bg-white text-center">
        <div className="px-4 sm:px-6 py-12 sm:py-20 max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Upload Match Details and Share the Scores
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
            Upload your match JSON file to view and share scores, including
            detailed scorecards and model-generated summaries.
          </p>
        </div>
      </div>
      {!loader && (
        <div
          className="mt-6 w-full max-w-lg flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 p-6 sm:p-12"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <DocumentChartBarIcon className="size-12 text-gray-300" />
          {authorized ? (
            <>
              <div className="mt-4 flex flex-col sm:flex-row items-center text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".json"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="mt-2 sm:mt-0 sm:ml-2">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-600 mt-2">Only JSON files</p>
              {file && (
                <p className="text-xs text-gray-600 mt-2">{file.name}</p>
              )}
              {message && (
                <p className="mt-4 text-sm text-gray-600">{message}</p>
              )}
            </>
          ) : (
            <div className="mt-4 text-red-600 font-medium text-center">
              You are not authorized to upload files. <br />
              Contact us to request access.
            </div>
          )}

          {file && (
            <button
              onClick={handleFileUpload}
              className="mt-4 w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md cursor-pointer"
              disabled={loading}
            >
              {!loading ? "Upload" : "Uploading..."}
            </button>
          )}
        </div>
      )}
    </div>
  );
}