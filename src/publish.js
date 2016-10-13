var awspublish = require('gulp-awspublish');
var parallelize = require('concurrent-transform');
var azureUpload = require('./azure_upload');

function publish(storage, files) {
    if (storage.type == 'aws')
        publishAws(storage, files);
    else if (storage.type == 'azure')
        publishAzure(storage, files)
}

function publishAws(storage, files) {
    var
        publisher = awspublish.create({
            params: {
                Bucket: storage.bucket
            },
            accessKeyId: storage.accessKeyId,
            secretAccessKey: storage.secretAccessKey,
            region: storage.region
        });

    return files.pipe(parallelize(publisher.publish(), 5))
        .pipe(publisher.sync(storage.folder))
        .pipe(awspublish.reporter());
}

function publishAzure(storage, files) {
    return files.pipe(azureUpload({
        prefix: storage.folder,
        account: storage.account,
        key: storage.key,
        container: storage.container
    }));
}

module.exports = publish;