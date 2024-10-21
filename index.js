// // //==================> just starting a project in ly local machine 


// // let firstName = "Nayan"
// // console.log(firstName);



// // ==============> this is to create a CLI to split a string to count number of words 



// const fs = require('fs');
// const { Command } = require('commander');
// const program = new Command();

// program
//   .name('counter')
//   .description('CLI to do file based tasks')
//   .version('0.8.0');

// program.command('count')
//   .description('Count the number of lines in a file')
//   .argument('<file>', 'file to count')
//   .action((file) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         const lines = data.split('\n').length;
//         console.log(`There are ${lines} lines in ${file}`);
//       }
//     });
//   });

// program.parse();




// =====================> CLI for Managing TODO operation

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

program
    .name('todo list')
    .description('CLI to do file based tasks')
    .version('0.8.0');

program
    .option('--add <string>', 'text to add to the file')
    .option('--delete <string>', 'text to delete')
    .option('--done <string>', 'mark the text done')
    .option('-help,', 'need help')
    .parse(process.argv);

const options = program.opts();

const folderPath = "./todo-tasks";
let fileName = "temp";
if (options.help) {
    const instruction1 = "while adding Keep the most important word of your todo description in the front then describe the task because the first word will become the file name of that particular task and rest string will become the text with in the file."
    const instruction2 = "while deleting give the name of the file to delete."
    const instruction3 = "while marking somethig done give the file name."
    console.log("_________ADDING ___________");
    console.log(instruction1);
    console.log("--add text_data")
    console.log("_________DELETING___________");
    console.log(instruction2);
    console.log("--delete text_data")
    console.log("__________MARK IT DONE__________");
    console.log(instruction3);
    console.log("--done text_data")
    console.log("____________________");
}
if (options.add) {
    let str = options.add.split(" ");
    fileName = str[0] + ".txt";
    let content = str.slice(1).join(" ");
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content);
    console.log("task got added check folder in todo-tasks");

}
if (options.delete) {
    fileName = options.delete;
    filePath = path.join(folderPath,fileName);
    fs.unlink(filePath, err => {
        if (err) {
            console.log("Please give the correct name!")
        }
        else {
            console.log("Requested item deleted Successfully!")
        }
    })
}
if (options.done) {
    fileName = options.done;
    let newName = "Done-"+fileName;
    filePath = path.join(folderPath,fileName);
    let fileRename = path.join(folderPath,newName);
    fs.rename(filePath,fileRename, err=> {
        if(err){
            console.log("Please give the correct name!")
        } else{
            console.log("Requested item marked Successfully!")
        }
    })
}

program.parse();