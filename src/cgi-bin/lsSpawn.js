const { spawn } = require("child_process");

const curl = spawn("curl", ["https://api.speedsms.vn/index.php/user/info?access-token=3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP"]);

curl.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
});

curl.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

curl.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

curl.on("close", code => {
    console.log(`child process exited with code ${code}`);
});