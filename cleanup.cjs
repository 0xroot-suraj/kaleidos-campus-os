const fs = require('fs');
const path = require('path');

const filesToClean = {
  'src/layouts/AppShell.tsx': [
    { target: 'Link, ', replacement: '' },
    { target: 'HelpCircle, ', replacement: '' },
    { target: '(n, i) =>', replacement: '(n) =>' }
  ],
  'src/pages/AdminDashboard.tsx': [
    { target: 'TrendingUp, ', replacement: '' }
  ],
  'src/pages/AdminEvents.tsx': [
    { target: 'Search, ', replacement: '' },
    { target: 'Clock, ', replacement: '' }
  ],
  'src/pages/CampusNavigator.tsx': [
    { target: 'ArrowRight, ', replacement: '' }
  ],
  'src/pages/LostLoop.tsx': [
    { target: 'Search, Filter, ', replacement: '' },
    { target: 'CheckCircle2, ', replacement: '' }
  ],
  'src/pages/StaffDashboard.tsx': [
    { target: 'CheckCircle2, Search, MoreVertical, ', replacement: '' },
    { target: "import { motion } from 'framer-motion';\n", replacement: '' }
  ],
  'src/pages/StaffEvents.tsx': [
    { target: 'Search, Filter, MapPin, Calendar, Clock, CheckCircle2, ', replacement: '' }
  ],
  'src/pages/StudentDashboard.tsx': [
    { target: ', MOCK_EVENTS', replacement: '' },
    { target: 'Bell, AlertTriangle, ', replacement: '' }
  ],
  'src/pages/Timetable.tsx': [
    { target: ', Video', replacement: '' }
  ],
  'src/components/AIAssistant.tsx': [
    { target: "import React, { useState, useRef, useEffect } from 'react';", replacement: "import { useState, useRef, useEffect } from 'react';" }
  ],
  'src/components/CommandPalette.tsx': [
    { target: "import React, { useState, useEffect } from 'react';", replacement: "import { useState, useEffect } from 'react';" }
  ],
  'src/pages/Events.tsx': [
    { target: "import React, { useState } from 'react';", replacement: "import { useState } from 'react';" }
  ],
  'src/pages/UsersList.tsx': [
    { target: "import React, { useState } from 'react';", replacement: "import { useState } from 'react';" }
  ],
  'src/store/AppContext.tsx': [
    { target: "import React, { createContext, useContext, useState, ReactNode } from 'react';", replacement: "import { createContext, useContext, useState, ReactNode } from 'react';" }
  ]
};

for (const [filepath, rules] of Object.entries(filesToClean)) {
  const fullPath = path.join(__dirname, filepath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    for (const rule of rules) {
      content = content.replace(rule.target, rule.replacement);
    }
    // Also remove generic React imports
    content = content.replace(/import React from 'react';\n/g, '');
    content = content.replace(/import React, {/g, 'import {');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned ${filepath}`);
  }
}
