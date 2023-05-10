import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthForm } from './components/forms/auth-form';
import { RecoverForms } from './components/forms/recover-forms';
import { RegisterForm } from './components/forms/register-form';
import { LayoutAuth } from './components/layouts/layout-auth';
import { LayoutGeneral } from './components/layouts/layout-general';
import { LayoutMain } from './components/layouts/layout-main';
import { ProtectedRoute } from './components/protected-route';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { TermsPage } from './pages/terms';
import { RoutePath, TermsContractContent } from './enums';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route element={<LayoutAuth />}>
        <Route path={RoutePath.auth} element={<AuthForm />} />
        <Route path={RoutePath.register} element={<RegisterForm />} />
        <Route path={RoutePath.passReset} element={<RecoverForms />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={RoutePath.main} element={<LayoutGeneral />}>
          <Route element={<LayoutMain />}>
            <Route path={RoutePath.main} element={<Navigate to={RoutePath.booksAll} />} />
            <Route path={RoutePath.booksCategory} element={<MainPage />} />
            <Route
              path={RoutePath.terms}
              element={<TermsPage contentType={TermsContractContent.terms} />}
            />
            <Route
              path={RoutePath.contract}
              element={<TermsPage contentType={TermsContractContent.contract} />}
            />
          </Route>
          <Route path={RoutePath.bookPage} element={<BookPage />} />
          <Route path={RoutePath.profile} element={<ProfilePage />} />
          <Route path={RoutePath.fallback} element={<Navigate to={RoutePath.main} />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
