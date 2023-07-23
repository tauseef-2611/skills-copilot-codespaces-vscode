function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member__skills');
  const memberSkillsList = document.querySelector('.member__skills-list');
  const memberSkillsListItems = document.querySelectorAll('.member__skills-list-item');
  const memberSkillsListItemsArray = Array.from(memberSkillsListItems);

  member.addEventListener('click', () => {
    memberSkills.classList.toggle('member__skills--active');
  });

  memberSkillsListItemsArray.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('member__skills-list-item--active');
    });
  });
}