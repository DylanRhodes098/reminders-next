export const SideNavData = [
  {
    key: 'home',
    label: '',
    type: 'group',
    children: [
      { key: 'home', label: 'Home', path: "" },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'folder1',
    label: '',
    type: 'group',
    children: [
      {
        key: 'folder1',
        label: 'Work',
        children: [
          { key: 'subList1', label: 'Morning', path:''},
         
        ],
      },

    ],
  },
  {
    key: 'folder2',
    label: 'Personal',
    children: [
      { key: 'subList2', label: 'Evening', path:'' },

    ],
  },
];

export const SideNavRoutes = {
  'home': '/',           // Home
  
};