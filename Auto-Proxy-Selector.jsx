{
    // メイン関数
    function setProxyFromFolder() {
        // プロジェクトが開かれているか確認
        if (app.project === null) {
            alert("No project is open.");
            return;
        }

        // フォルダ選択ダイアログを表示
        var selectedFolder = Folder.selectDialog("Select the folder that contains your video files.");
        if (selectedFolder === null) {
            return; // キャンセルされた場合
        }

        // フォルダ内のすべてのファイルを取得
        var allFiles = selectedFolder.getFiles();
        if (allFiles.length === 0) {
            alert("There are no files in the selected folder.");
            return;
        }

        // 動画ファイルのみをフィルタリング
        var videoExtensions = /\.(mp4|mov|avi|mxf|m4v|wmv)$/i;
        var videoFiles = allFiles.filter(function(file) {
            return file instanceof File && videoExtensions.test(file.name);
        });

        if (videoFiles.length === 0) {
            alert("No video files were found in the selected folder.");
            return;
        }

        // コンポジションにプロキシを設定
        app.beginUndoGroup("Set Proxy for Compositions");
        var projectItems = app.project.items;

        for (var i = 1; i <= projectItems.length; i++) {
            var item = projectItems[i];
            if (item instanceof CompItem) {
                for (var j = 0; j < videoFiles.length; j++) {
                    var videoFile = videoFiles[j];
                    var videoNameWithoutExt = videoFile.name.split('.').slice(0, -1).join('.');

                    // コンポジション名と動画ファイル名が一致する場合
                    if (item.name === videoNameWithoutExt) {
                        try {
                            item.setProxy(videoFile);
                            //$.writeln("Proxy set for: " + item.name);
                        } catch (e) {
                            //$.writeln("Failed to set proxy for: " + item.name + " (" + e.message + ")");
                        }
                        break;
                    }
                }
            }
        }

        app.endUndoGroup();
        alert("Proxy configuration is complete!");
    }

    // 実行
    setProxyFromFolder();
}