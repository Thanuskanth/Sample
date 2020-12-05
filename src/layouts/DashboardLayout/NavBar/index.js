import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import User from './user';
import PrintProvider, { NoPrint } from 'react-easy-print';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
 
  {
    href: '/app/Owners',
    icon: UsersIcon,
    title: 'Owners'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/Package',
    icon: ShoppingBagIcon,
    title: 'Package'
  },
  {
    href: '/app/Items',
    icon: BarChartIcon,
    title: 'Items'
  },
  {
    href: '/app/Program',
    icon: SettingsIcon,
    title: 'Program'
  },
  {
    href: '/app/Invoice',
    icon: UserIcon,
    title: 'Invoice'
  },
  {
    href: '/app/Receipt',
    icon: LockIcon,
    title: 'Receipt'
  },
  {
    href: '/app/service',
    icon: LockIcon,
    title: 'Service'
  },
  {
    href: '/app/program_package',
    icon: LockIcon,
    title: 'Program Package'
  },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // }
  
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)' ,
    zIndex:0
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const content = (
  <PrintProvider>
          <NoPrint>
 
 
    
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
       <User/>
      </Box>
      <Divider />
      <Box p={2}>
        
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        
      </Box>
      <Box flexGrow={1} />
    
        
       
         
     
    </Box>
    </NoPrint>
        </PrintProvider>
  );

  return (
    
    <NoPrint>
       
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </NoPrint>

  
       
          );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;



