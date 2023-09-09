pipeline{
    agent any
    stages{
        stage("verify tooling"){
            steps{
                sh '''
                docker version
                docker info
                docker compose version
                curl --version
                jq --version 
            '''
            }
            } 
        stage('build') {
            steps {
                echo 'start build1'
                withCredentials([usernamePassword(credentialsId: 'a21c3d9b-109d-402e-96ce-3f9815c85bf9', usernameVariable: 'user', passwordVariable: 'password')]) {
                echo 'start build2'
                // sh 'docker build -t mshams1/node-app .'
                sh "docker login -u $user -p $password"
                sh 'docker-compose -f docker-compose.yml -f docker-compose.dev.yml  build'
                 sh 'docker-compose -f docker-compose.yml -f docker-compose.dev.yml  push'
                
                echo 'excute docker' 
                
                // sh 'docker push mshams1/node-app'
                sh 'docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --scale node-app=3' //up -d --build --scale node-app=3
              }
            }
        }
        // stage("excute docker"){
        //     steps{
        //         sh '''
        //         docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d  --scale node-app=3
        //     '''
        // }

        // }
    }
    
}