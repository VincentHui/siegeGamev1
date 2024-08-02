const { exec } = require("child_process");

function openTerminal(command) {
  const platform = process.platform;

  let terminalCommand;

  if (platform === "win32") {
    // Windows
    terminalCommand = `start cmd.exe /k "${command}"`;
  } else if (platform === "darwin") {
    // macOS
    // terminalCommand = `osascript -e 'tell application "Terminal" to do script "${command}"'`;
    terminalCommand = `open -a Terminal "$(pwd)" && osascript -e 'tell application "Terminal" to do script "cd $(pwd) && ${command}" in selected tab of the front window'`;

    // terminalCommand = `open -a Terminal ${command}`;
    // cp.exec();
  } else if (platform === "linux") {
    // Linux (GNOME Terminal as an example)
    terminalCommand = `gnome-terminal -- bash -c "${command}; exec bash"`;
  } else {
    console.error("Unsupported platform:", platform);
    return;
  }

  exec(terminalCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    console.log(`Stdout: ${stdout}`);
  });
}

module.exports = {
  openTerminal,
};
