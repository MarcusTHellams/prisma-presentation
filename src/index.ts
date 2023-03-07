import inquirer from 'inquirer';

import * as user from './users';

enum Answers {
  GET_USERS = 'Get Users',
  UPDATE_USER = 'Update User',
  DELETE_USER = 'Delete User',
  ADD_USER = 'Add User',
}

const main = async () => {
  const answers: { userFunction: Answers } = await inquirer.prompt([
    {
      name: 'userFunction',
      message: 'Which user function would you like to run',
      type: 'list',
      choices: [
        Answers.GET_USERS,
        Answers.UPDATE_USER,
        Answers.ADD_USER,
        Answers.DELETE_USER,
      ],
    },
  ]);

  switch (answers.userFunction) {
    case Answers.GET_USERS:
      await user.getUsers();
      break;
    case Answers.UPDATE_USER:
      await user.updateUser();
      break;
    case Answers.DELETE_USER:
      await user.deleteUser();
      break;
    case Answers.ADD_USER:
      await user.addUserWithBookAndRole();
      break;
    default:
      break;
  }
  main();
};

main();
