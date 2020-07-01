const {existsSync, mkdirSync, writeFileSync} = require('fs');
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
        console.log('Executing Mochawesome Marge');
        const marge = spawn('yarn', ['marge', DIR.reportfile, '-f', 'report', '-o', DIR.mochareports ]);
        marge.stderr.on('data', (data) => console.log(data));
        marge.on('close', (code) => console.log(`Mochawesome Marge exited with code ${code}`));
    } catch(e) {
        console.log(e);
    }
}

const createDir = (dir, erroronexist = false) => {
    console.log(`Creating Directory ${dir}`);
    if (!existsSync(dir)){
        mkdirSync(dir);
        return true;
    } else {
        console.log(`${dir} already exists ${erroronexist ? '- Aborting Process' : ''}`);
        erroronexist && process.exit(1);
        return true;
    }
}

if (createDir(DIR.mochareports, true)) {
    console.log(`Merging Report Files`);
    merge({
        files: [
          `${DIR.mocha}/*.json`
        ],
      }).then(report => {
        try {
            writeFileSync(DIR.reportfile, JSON.stringify(report, null, 2));
            console.log(`Merging Done`);
        } catch(e) {
            console.log('Error occured while Merging Files');
            console.log(e);
        }
        marge()
    });
}


