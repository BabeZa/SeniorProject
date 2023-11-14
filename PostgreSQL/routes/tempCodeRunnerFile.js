gm('./public/images/img.jpg')
    .resize(240, 240, '!')
    .write('./public/images/resize.png', function (err) {
        if (!err) console.log('done');
});