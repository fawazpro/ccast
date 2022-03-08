<?php namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		if($this->session->logged){
			echo view('header');
			echo view('home');
			echo view('footer');	
		}else{
			return redirect()->to('login');
		}
	}

	public function postlogin()
	{
		$incoming = $this->request->getPost();
		if($incoming['pass'] == 'admin'){
			$this->session->set(['logged'=>true]);
		}
		return redirect()->to(base_url('/'));
	}

	public function postregister()
	{
		$incoming = $this->request->getPost();
		$Users = new \App\Models\Users();
		$user_data = [
			'fname'=> explode(' ', $incoming['name'])[0],
			'lname'=> explode(' ', $incoming['name'])[1],
			'email'=> $incoming['email'],
			'pass'=> strrev(explode(' ', $incoming['name'])[1]),
			'password'=> md5(strrev(explode(' ', $incoming['name'])[1])),
			'clearance'=> strtolower($incoming['plan']),
			'paid' => 0
		];
		$Users->insert($user_data);
		echo view('footer');
	}

	public function login()
	{
		if($this->session->logged){
			return redirect()->to(base_url('/'));	
		}else{
			echo view('header');
			echo view('login');
			echo view('footer');
		}
	}

	public function logout()
	{
		$this->session->destroy();
		return redirect()->to(base_url('/login'));
	}

	public function email()
	{
		return view('email');
	}

	//--------------------------------------------------------------------

}
