var awspublish = require('gulp-awspublish');
var parallelize = require('concurrent-transform');
var azureUpload = require('./azure_upload');
var ftp = require('vinyl-ftp');

function publish(storage, files) {
    if (storage.type == 'aws')
        publishAws(storage, files);
    else if (storage.type == 'azure')
        publishAzure(storage, files)
    else if (storage.type == 'ftp')
        publishFtp(storage, files)
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

function publishFtp(storage, files) {
    var conn = ftp.create({
        host: storage.host,
        port: storage.port || 21,
        user: storage.user,
        secure: storage.secure,
        password: storage.password,
        parallel: 5
    });

    return files.pipe(conn.dest(storage.folder));
}

module.exports = publish;