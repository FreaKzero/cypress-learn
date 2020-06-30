const rimraf = require('rimraf');
const fs = require('fs');
const { spawn } = require('child_process');
const { merge } = require('mochawesome-merge')

const BASEDIR = './cypress/reports';
const DIR = {
    mochareports: `${BASEDIR}/mochareports`,
    mocha: `${BASEDIR}/mocha`,
    reportfile: `${BASEDIR}/mochareports/report.json`
};

const marge = () => {
    try {
        console.log('Executing Marge....');
        const marge = spawn('yarn', ['marge', DIR.reportfile, '-f', 'report', '-o', DIR.mochareports ]);
        marge.stdout.on('data', (data) => console.log(data));
        marge.stderr.on('data', (data) => console.log(data));
        marge.on('close', (code) => console.log(`Marge exited with code ${code}`));
    } catch(e) {
        console.log(e);
    }
}

const createDir = (dir, erroronexist = false) => {
    console.log(`Creating Directory ${dir}`);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        return true;
    } else {
        console.log(`${dir} already exists ${erroronexist ? '- Aborting Process' : ''}`);
        erroronexist && process.exit(1);
        return true;
    }
}

if (createDir(DIR.mochareports, true)) {
    merge({
        files: [
          `${DIR.mocha}/*.json`
        ],
      }).then(report => {
        fs.writeFileSync(DIR.reportfile, JSON.stringify(report, null, 2));
        marge()
    });
}


