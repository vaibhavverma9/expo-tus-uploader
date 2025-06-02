import ExpoModulesCore
import TUSKit

public class ExpoTusUploaderModule: Module {
  var tusSession: TUSSession?

  public func definition() -> ModuleDefinition {
    Name("ExpoTusUploader")

    Events("TusUploadProgress")

    AsyncFunction("upload") { (uri: String, endpoint: String, metadata: [String: String]?, promise: Promise) in
      let cleanPath = uri.replacingOccurrences(of: "file://", with: "")
      let fileURL = URL(fileURLWithPath: cleanPath)

      guard FileManager.default.fileExists(atPath: fileURL.path) else {
        return promise.reject("FILE_NOT_FOUND", "File does not exist at path: \(fileURL.path)")
      }

      guard let uploadURL = URL(string: endpoint) else {
        return promise.reject("INVALID_ENDPOINT", "Provided endpoint is not a valid URL.")
      }

      let config = TUSConfig(withUploadURL: uploadURL)
      config.logLevel = .all

      tusSession = TUSSession(endpoint: uploadURL, dataStore: TUSFileUploadStore(), config: config)

      guard let upload = try? tusSession?.createUpload(fromFile: fileURL) else {
        return promise.reject("UPLOAD_ERROR", "Failed to create TUS upload from file")
      }

      upload?.metadata = metadata ?? [:]

      tusSession?.resumeUpload(upload!) { result in
        switch result {
        case .success:
          promise.resolve("Upload complete")
        case .failure(let error):
          promise.reject("UPLOAD_FAILED", error.localizedDescription)
        }
      }

      // Hook into delegate callbacks for progress
      upload?.progressBlock = { bytesSent, bytesTotal in
        self.sendEvent("TusUploadProgress", [
          "bytesSent": bytesSent,
          "bytesTotal": bytesTotal
        ])
      }
    }
  }
}
